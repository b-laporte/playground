import {
    IReactionDisposer,
    action,
    autorun,
    observable,
    runInAction,
} from "mobx";
import { CounterListController, CounterListModel } from "./counterlist.types";
import { getObject, registerObject } from "../../lib/registry";
import { createCounter } from "../counter/counter";

export function createCounterList(nbrOfCounters = 10): CounterListController {
    const data: CounterListModel = observable({
        type: "CounterListModel",
        controllerRef: "",
        counters: [...Array(nbrOfCounters).keys()].map(
            (k) => createCounter(`Counter #${k + 1}`).data
        ),
        sumOfAllCounts: 0, // computed
    });

    const reactions: { [key: string]: IReactionDisposer } = {
        sumOfAllCounts: autorun(() => {
            // warning: value calculation cannot be done in the action as action dependencies cannot be tracked
            const sum = data.counters.reduce(
                (acc, counter) => acc + counter.value,
                0
            );
            runInAction(() => {
                data.sumOfAllCounts = sum;
            });
        }),
    };

    const controller: CounterListController = {
        data,
        reset: action(() => {
            for (const counter of data.counters) {
                getObject(counter.controllerRef)?.increment(-counter.value);
            }
        }),
        dispose() {
            for (const counter of data.counters) {
                getObject(counter.controllerRef)?.dispose();
            }
            for (const k of Object.getOwnPropertyNames(reactions)) {
                reactions[k]();
            }
        },
    };

    data.controllerRef = registerObject(controller);
    return controller;
}
