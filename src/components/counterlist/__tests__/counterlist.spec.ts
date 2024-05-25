import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { CounterListModel, CounterListController } from "../counterlist.types";
import { createCounterList } from "../counterlist";
import { getObject } from "../../../lib/registry";

describe("Counter List", () => {
    const DEFAULT_COUNTER_LENGTH = 5;
    let counterList: CounterListController, data: CounterListModel;

    beforeEach(() => {
        counterList = createCounterList(DEFAULT_COUNTER_LENGTH);
        data = counterList.data;
    });

    afterEach(() => {
        counterList.dispose();
    });

    function counter(idx: number) {
        return getObject(data.counters[idx].controllerRef) || null;
    }

    it("should load properly", async () => {
        expect(data.counters.length).toBe(DEFAULT_COUNTER_LENGTH);
        expect(data.counters[0].name).toBe("Counter #1");
        expect(data.counters[0].value).toBe(0);
        expect(data.sumOfAllCounts).toBe(0);
    });

    it("should process the sum of all counts", async () => {
        expect(data.sumOfAllCounts).toBe(0);

        counter(0)?.increment(5);
        expect(data.sumOfAllCounts).toBe(5);

        counter(1)?.increment(-25);
        expect(data.sumOfAllCounts).toBe(-20);
    });

    it("should support reset()", async () => {
        expect(data.sumOfAllCounts).toBe(0);

        counter(0)?.increment(15);
        expect(data.counters[0].value).toBe(15);
        expect(data.sumOfAllCounts).toBe(15);

        counterList.reset();
        expect(data.sumOfAllCounts).toBe(0);
        expect(data.counters[0].value).toBe(0);
    });

    it("should properly dispose reactions", async () => {
        counterList.dispose();
        counter(0)?.increment(5);
        expect(data.sumOfAllCounts).toBe(0); // reaction not run
    });
});
