import { useState } from "react";

import { Table } from "./components/Table";
import { Tape } from "./components/Tape";
import { useTableStore } from "./store";

export default function App() {
  const table = useTableStore((state) => state.table);

  const [input, setInput] = useState(() => Array(15).fill("0"));

  const [index, setIndex] = useState(0);

  const [state, setState] = useState("q0");

  const next = async (input: string[], index: number, state: string) => {
    const stateIndex = table.states.findIndex((s) => s === state);

    const symbolIndex = table.symbols.findIndex(
      (s) => s === (input[index] || "B"),
    );

    const [newState, newSymbol, direction] = table.transitions[stateIndex][
      symbolIndex
    ]
      .split(",")
      .map((s) => s.trim());

    if (newState && newSymbol && direction) {
      const newInput = input.map((symbol, i) =>
        i === index ? newSymbol : symbol,
      );

      const newIndex = direction === "R" ? index + 1 : index - 1;

      setInput(newInput);

      setIndex(newIndex);

      setState(newState);

      await new Promise((r) => setTimeout(r, 0));

      next(newInput, newIndex, newState);
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center h-full">
      <Table />
      <button
        onClick={() => next(input, index, state)}
        className="border border-white rounded-xl p-4 cursor-pointer text-4xl"
      >
        Run
      </button>
      <Tape index={index} input={input} state={state} />
    </div>
  );
}
