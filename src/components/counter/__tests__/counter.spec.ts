import { describe, expect, it, beforeEach } from "vitest";
import { CounterController, CounterModel } from "../counter.types";
import { createCounter } from "../counter";
import { getObject } from "../../../lib/registry";

describe("Counter", () => {
    let counter: CounterController, data: CounterModel;

    beforeEach(() => {
        counter = createCounter("TEST");
        data = counter.data;
    });

    it("should load properly", async () => {
        expect(counter.data.name).toBe("TEST");
        expect(counter.data.value).toBe(0);

        const c2 = createCounter("C2", 12);
        expect(c2.data.name).toBe("C2");
        expect(c2.data.value).toBe(12);

        const c2bis = getObject(c2.data.controllerRef);
        expect(c2bis).toBe(c2);
    });

    it("should support increment()", async () => {
        expect(data.value).toBe(0);
        counter.increment();
        expect(data.value).toBe(1);
        counter.increment(10);
        expect(data.value).toBe(11);
        counter.increment(-1);
        expect(data.value).toBe(10);
    });
});
