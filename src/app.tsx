import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { CounterList } from "./components/counterlist/counterlist.view";
import "./index.css";
import { createCounterList } from "./components/counterlist/counterlist";

async function main() {
    const counterList = createCounterList(12);
    const root = ReactDOM.createRoot(document.getElementById("main")!);
    root.render(
        <>
            <CounterList data={counterList.data} />
        </>
    );
}

main();
