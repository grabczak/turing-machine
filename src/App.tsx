import { Table } from "./components/Table";
import { Tape } from "./components/Tape";
import { useMachineStore } from "./store";

export default function App() {
  const { states, symbols, transitions, input, state, offset, makeTransition } =
    useMachineStore();

  const run = () => {
    const mapIndices = (array: string[]): { [key: string]: number } => {
      return array.reduce(
        (acc, item, index) => ({ ...acc, [item]: index }),
        {},
      );
    };

    const stateIndices = mapIndices(states);
    const symbolIndices = mapIndices(symbols);

    console.log(stateIndices, symbolIndices, state);

    const next = async (input: string[], state: string, offset: number) => {
      const stateIndex = stateIndices[state];
      const symbolIndex = symbolIndices[input[offset] || "B"];

      console.log(stateIndex, symbolIndex);

      const [nextState, nextSymbol, direction] = transitions[stateIndex][
        symbolIndex
      ]
        .split(",")
        .map((s) => s.trim());

      if (nextState && nextSymbol && direction) {
        const nextInput = input.map((symbol, i) =>
          i === offset ? nextSymbol : symbol,
        );

        const nextOffset = direction === "L" ? offset - 1 : offset + 1;

        makeTransition(nextInput, nextState, nextOffset);

        await new Promise((r) => setTimeout(r, 0));

        next(nextInput, nextState, nextOffset);
      }
    };

    next(input, state, offset);
  };

  return (
    <div className="flex flex-col justify-evenly items-center h-full">
      <Table />
      <button
        onClick={run}
        className="border border-white rounded-xl p-4 cursor-pointer text-4xl"
      >
        Run
      </button>
      <Tape />
    </div>
  );
}
