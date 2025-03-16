import { TTable } from "../types";

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

  const addRow = () => {
    setTable((table) => ({
      ...table,
      states: [...table.states, ""],
      matrix: [...table.matrix, Array(table.symbols.length).fill("")],
    }));
  };

  const removeRow = (i: number) => {
    setTable((table) => ({
      ...table,
      states: table.states.filter((_, j) => j !== i),
      matrix: table.matrix.filter((_, j) => j !== i),
    }));
  };

  const addColumn = () => {
    setTable((table) => ({
      ...table,
      symbols: [...table.symbols, ""],
      matrix: table.matrix.map((r) => [...r, ""]),
    }));
  };

  const removeColumn = (i: number) => {
    setTable((table) => ({
      ...table,
      symbols: table.symbols.filter((_, j) => j !== i),
      matrix: table.matrix.map((r) => r.filter((_, j) => j !== i)),
    }));
  };

  return (
    <div className="relative text-2xl">
      <table>
        <thead>
          <tr>
            <th className="border border-white">
              <input value={"δ"} disabled className="px-4 py-2" />
            </th>
            {table.symbols.map((s, i) => (
              <th key={String(i)} className="relative border border-white">
                <div
                  onClick={() => removeColumn(i)}
                  className="absolute p-2 cursor-pointer -translate-y-12 w-full opacity-0 hover:opacity-100"
                >
                  ⊖
                </div>
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
                <div
                  onClick={() => removeRow(i)}
                  className="absolute p-2 cursor-pointer -translate-x-10 opacity-0 hover:opacity-100"
                >
                  ⊖
                </div>
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
      <div
        onClick={addRow}
        className="absolute w-full flex justify-center items-center p-2 cursor-pointer opacity-0 hover:opacity-100"
      >
        ⊕
      </div>
      <div
        onClick={addColumn}
        className="absolute h-full right-0 top-0 translate-x-10 flex justify-center items-center p-2 cursor-pointer opacity-0 hover:opacity-100"
      >
        ⊕
      </div>
    </div>
  );
};
