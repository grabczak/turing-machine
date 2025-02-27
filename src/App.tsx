import { useEffect, useState } from "react";

type TTable = {
  states: string[];
  symbols: string[];
  matrix: string[][];
};

export const Table = ({
  table,
  setTable,
}: {
  table: TTable;
  setTable: React.Dispatch<React.SetStateAction<TTable>>;
}) => {
  const handleStateChange = (i: number, v: string) => {
    setTable((table) => ({
      ...table,
      states: table.states.map((s, j) => (j === i ? v : s)),
    }));
  };

  const handleSymbolChange = (i: number, v: string) => {
    setTable((table) => ({
      ...table,
      symbols: table.symbols.map((s, j) => (j === i ? v : s)),
    }));
  };

  const handleMatrixChange = (i: number, j: number, v: string) => {
    setTable((table) => ({
      ...table,
      matrix: table.matrix.map((r, _i) =>
        _i === i ? r.map((c, _j) => (_j === j ? v : c)) : r,
      ),
    }));
  };

  return (
    <table className="text-2xl">
      <thead>
        <tr>
          <th className="border border-white">
            <input value={"δ"} disabled className="px-4 py-2" />
          </th>
          {table.symbols.map((s, i) => (
            <th key={String(i)} className="border border-white">
              <input
                value={s}
                onChange={(e) => handleSymbolChange(i, e.target.value)}
                className="px-4 py-2"
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.matrix.map((r, i) => (
          <tr key={String(i)}>
            <td className="border border-white">
              <input
                value={table.states[i]}
                onChange={(e) => handleStateChange(i, e.target.value)}
                className="px-4 py-2"
              />
            </td>
            {r.map((d, j) => (
              <td key={`${i}-${j}`} className="border border-white">
                <input
                  value={d}
                  onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                  className="px-4 py-2"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Tape = ({
  index,
  input,
  state,
}: {
  index: number;
  input: string[];
  state: string;
}) => {
  return (
    <div className="text-4xl">
      <div
        className="w-16 h-16 flex justify-center items-center"
        style={{ transform: `translateX(${index * 52}px)` }}
      >
        ↓
      </div>
      <div className="flex">
        {input.map((symbol, i) => (
          <div
            className="border border-white w-16 h-16 flex justify-center items-center"
            key={i}
          >
            {symbol}
          </div>
        ))}
      </div>
      <div
        className="w-16 h-16 flex justify-center items-center text-2xl"
        style={{ transform: `translateX(${index * 52}px)` }}
      >
        {state}
      </div>
    </div>
  );
};

export default function App() {
  const getInitialState = () => {
    const table = localStorage.getItem("table");

    if (table) {
      return JSON.parse(table);
    }

    return {
      states: ["q0", "q1", "q2", "q3", "q4"],
      symbols: ["0", "X", "B"],
      matrix: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  };

  const [table, setTable] = useState<TTable>(getInitialState);

  useEffect(() => {
    localStorage.setItem("table", JSON.stringify(table));
  }, [table]);

  const [input, setInput] = useState(() => Array(31).fill("0"));

  const [index, setIndex] = useState(0);

  const [state, setState] = useState("q0");

  const next = async (input: string[], index: number, state: string) => {
    const stateIndex = table.states.findIndex((s) => s === state);

    const symbolIndex = table.symbols.findIndex(
      (s) => s === (input[index] || "B"),
    );

    const [newState, newSymbol, direction] = table.matrix[stateIndex][
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
      <Table table={table} setTable={setTable} />
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
