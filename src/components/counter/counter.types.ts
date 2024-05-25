import { ObjectRef } from "../../lib/registry.types";

/** The counter controller */
export interface CounterController {
    /** View model */
    data: CounterModel;
    /** Increment the counter value - default value:1 */
    increment(value?: number): void;
    /** Dispose internal dependencies before the controller is released for garbage collection */
    dispose(): void;
}

export interface CounterModel {
    type: "CounterModel";
    controllerRef: ObjectRef<CounterController>;
    name: string;
    value: number;
}
