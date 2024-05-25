import { observer } from "mobx-react-lite";
import { CounterModel } from "./counter.types";
import { getObject } from "../../lib/registry";

export const Counter = observer(({ data }: { data: CounterModel }) => {
    const controller = getObject(data.controllerRef);

    return (
        <div className="flex text-gray-700 gap-4 items-center cursor-default">
            <div className="w-28 shrink-0">{data.name}:</div>
            <div className="w-6 font-bold shrink-0 text-right">
                {data.value}
            </div>
            <Button increment={-1} />
            <Button increment={1} />
            <Button increment={-10} />
            <Button increment={10} />
        </div>
    );

    function Button({ increment = 1 }: { increment?: number }) {
        return (
            <button
                className="rounded bg-slate-400 text-white px-2 text-sm"
                onClick={() => controller?.increment(increment)}
            >
                {increment >= 0 ? "+" : ""}
                {increment}
            </button>
        );
    }
});
