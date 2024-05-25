import { action, observable } from "mobx";
import { CounterController, CounterModel } from "./counter.types";
import { registerObject } from "../../lib/registry";

export function createCounter(name: string, initValue = 0): CounterController {
    const model: CounterModel = observable({
        type: "CounterModel",
        controllerRef: "",
        name,
        value: initValue,
    });

    const controller: CounterController = {
        data: model,
        increment: action((offset: number = 1) => {
            model.value += offset;
        }),
        dispose() {},
    };

    model.controllerRef = registerObject(controller);
    return controller;
}
