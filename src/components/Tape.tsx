const Cell = ({
  value,
  head,
  state,
}: {
  value: string;
  head: boolean;
  state: string;
}) => {
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
        className="border border-white w-16 h-16 text-center"
      />
      <div
        className="w-16 h-16 flex justify-center items-center text-2xl"
        style={{ visibility: head ? "visible" : "hidden" }}
      >
        {state}
      </div>
    </div>
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
    <div className="flex text-4xl">
      <Cell value="#" head={index === -1} state={state} />
      <div className="flex">
        {input.map((symbol, i) => (
          <Cell value={symbol} head={index === i} state={state} key={i} />
        ))}
      </div>
    </div>
  );
};
