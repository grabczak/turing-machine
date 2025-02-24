import { useState } from "react";

export const Table = ({
  matrix,
  setMatrix,
}: {
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
}) => {
  const handleChange = (row: number, column: number, value: string) => {
    setMatrix((matrix) =>
      matrix.map((r, _i) =>
        _i === row ? r.map((c, _j) => (_j === column ? value : c)) : r,
      ),
    );
  };

  return (
    <table className="text-2xl">
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={`${i}-${j}`} className="border border-white">
                <input
                  value={cell}
                  onChange={(e) => handleChange(i, j, e.target.value)}
                  disabled={cell === "δ"}
                  className="text-center py-4"
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
  const [matrix, setMatrix] = useState(() => [
    ["δ", "0", "X", "B"],
    ["q0", "q1, X, R", "", "q4, B, L"],
    ["q1", "q1, 0, R", "", "q2, B, L"],
    ["q2", "q3, B, L", "q4, 0, L", ""],
    ["q3", "q3, 0, L", "q0, X, R", ""],
    ["q4", "", "q4, 0, L", ""],
  ]);

  const [input, setInput] = useState(() => Array(9).fill("0"));

  const [index, setIndex] = useState(0);

  const [state, setState] = useState("q0");

  const next = async (input: string[], index: number, state: string) => {
    const stateIndex = matrix.findIndex((row) => row[0] === state);

    const symbolIndex = matrix[0].findIndex(
      (symbol) => symbol === (input[index] || "B"),
    );

    const [newState, newSymbol, direction] = matrix[stateIndex][symbolIndex]
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
      <Table matrix={matrix} setMatrix={setMatrix} />
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
