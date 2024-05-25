import { observer } from "mobx-react-lite";
import { CounterListModel } from "./counterlist.types";
import { getObject } from "../../lib/registry";
import { Counter } from "../counter/counter.view";

export const CounterList = observer(({ data }: { data: CounterListModel }) => {
    const controller = getObject(data.controllerRef);

    return (
        <div className="flex flex-col text-gray-700 gap-2 items-start cursor-default p-6 w-fit">
            {data.counters.map((c) => (
                <Counter key={`counter-${c.controllerRef}`} data={c} />
            ))}
            <div className="flex mt-2 pt-2 border-t border-slate-500 w-full items-center">
                <div className="grow">Total: {data.sumOfAllCounts} </div>
                <div
                    className="cursor-pointer text-sm"
                    onClick={controller?.reset}
                >
                    Reset
                </div>
            </div>
        </div>
    );
});
