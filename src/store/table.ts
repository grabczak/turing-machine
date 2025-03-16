import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TTable } from "../types";

type TTableState = {
  table: TTable;
  changeState: (i: number, v: string) => void;
  changeSymbol: (i: number, v: string) => void;
  changeTransition: (i: number, j: number, v: string) => void;
  addRow: () => void;
  removeRow: (i: number) => void;
  addColumn: () => void;
  removeColumn: (i: number) => void;
};

const createTable = () => {
  const states = ["q0", "q1", "q2", "q3", "q4"];
  const symbols = ["0", "X", "B"];

  return {
    states,
    symbols,
    transitions: Array(states.length).fill(Array(symbols.length).fill("")),
  };
};

export const useTableStore = create<TTableState>()(
  persist(
    (set) => ({
      table: createTable(),
      changeState: (i, v) => {
        set((state) => ({
          table: {
            ...state.table,
            states: state.table.states.map((s, j) => (j === i ? v : s)),
          },
        }));
      },
      changeSymbol: (i, v) => {
        set((state) => ({
          table: {
            ...state.table,
            symbols: state.table.symbols.map((s, j) => (j === i ? v : s)),
          },
        }));
      },
      changeTransition: (i, j, v) => {
        set((state) => ({
          table: {
            ...state.table,
            transitions: state.table.transitions.map((r, _i) =>
              _i === i ? r.map((c, _j) => (_j === j ? v : c)) : r,
            ),
          },
        }));
      },
      addRow: () => {
        set((state) => ({
          table: {
            ...state.table,
            states: [...state.table.states, ""],
            transitions: [
              ...state.table.transitions,
              Array(state.table.symbols.length).fill(""),
            ],
          },
        }));
      },
      removeRow: (i) => {
        set((state) => ({
          table: {
            ...state.table,
            states: state.table.states.filter((_, j) => j !== i),
            transitions: state.table.transitions.filter((_, j) => j !== i),
          },
        }));
      },
      addColumn: () => {
        set((state) => ({
          table: {
            ...state.table,
            symbols: [...state.table.symbols, ""],
            transitions: state.table.transitions.map((r) => [...r, ""]),
          },
        }));
      },
      removeColumn: (i) => {
        set((state) => ({
          table: {
            ...state.table,
            symbols: state.table.symbols.filter((_, j) => j !== i),
            transitions: state.table.transitions.map((r) =>
              r.filter((_, j) => j !== i),
            ),
          },
        }));
      },
    }),
    { name: "table-storage" },
  ),
);
