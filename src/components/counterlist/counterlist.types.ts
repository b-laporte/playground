import { ObjectRef } from "../../lib/registry.types";
import { CounterModel } from "../counter/counter.types";

/** The counter list controller */
export interface CounterListController {
    /** View model */
    data: CounterListModel;
    /** Reset all counters */
    reset(): void;
    /** Dispose internal dependencies before the controller is released for garbage collection */
    dispose(): void;
}

export interface CounterListModel {
    type: "CounterListModel";
    controllerRef: ObjectRef<CounterListController>;
    /** The list of counters */
    counters: CounterModel[];
    /** The sum of all counter values */
    sumOfAllCounts: number;
}
