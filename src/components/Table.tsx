import { useTableStore } from "../store";

export const Table = () => {
  const {
    table,
    changeState,
    changeSymbol,
    changeTransition,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
  } = useTableStore((state) => state);

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
                  onChange={(e) => changeSymbol(i, e.target.value)}
                  className="px-4 py-2"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.transitions.map((r, i) => (
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
                  onChange={(e) => changeState(i, e.target.value)}
                  className="px-4 py-2"
                />
              </td>
              {r.map((d, j) => (
                <td key={`${i}-${j}`} className="border border-white">
                  <input
                    value={d}
                    onChange={(e) => changeTransition(i, j, e.target.value)}
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
