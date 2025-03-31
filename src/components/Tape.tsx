import { useMachineStore } from "../store";

const Cell = ({
  value,
  head,
  handleChange,
}: {
  value: string;
  head: boolean;
  handleChange?: (value: string) => void;
}) => {
  const _handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  return (
    <div>
      <div
        className="w-16 h-16 flex justify-center items-center"
        style={{ visibility: head ? "visible" : "hidden" }}
      >
        ↓
      </div>
      <input
        value={value}
        onChange={_handleChange}
        className="border border-white w-16 h-16 text-center"
      />
      <div
        className="w-16 h-16 flex justify-center items-center"
        style={{ visibility: head ? "visible" : "hidden" }}
      >
        ↑
      </div>
    </div>
  );
};

export const Tape = () => {
  const { input, offset, changeInput } = useMachineStore();

  return (
    <div className="flex text-4xl">
      <Cell value="#" head={offset === -1} />
      <div className="flex">
        {input.map((symbol, i) => (
          <Cell
            key={i}
            value={symbol}
            head={offset === i}
            handleChange={(v) => changeInput(i, v)}
          />
        ))}
      </div>
    </div>
  );
};
