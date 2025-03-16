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
