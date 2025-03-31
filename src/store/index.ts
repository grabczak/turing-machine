import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TMachineState = {
  states: string[];
  symbols: string[];
  transitions: string[][];
  input: string[];
  state: string;
  offset: number;
  changeState: (i: number, value: string) => void;
  changeSymbol: (i: number, value: string) => void;
  changeTransition: (i: number, j: number, value: string) => void;
  addRow: () => void;
  removeRow: (i: number) => void;
  addColumn: () => void;
  removeColumn: (i: number) => void;
  changeInput: (i: number, value: string) => void;
  makeTransition: (
    nextInput: string[],
    nextState: string,
    nextOffset: number,
  ) => void;
};

const createMachine = () => {
  const states = ["q0", "q1", "q2", "q3", "q4"];
  const symbols = ["0", "X", "B"];

  const transitions = [
    ["q1, X, R", "", "q4, B, L"],
    ["q1, 0, R", "", "q2, B, L"],
    ["q3, B, L", "q4, 0, L", ""],
    ["q3, 0, L", "q0, X, R", ""],
    ["", "q4, 0, L", ""],
  ];

  return {
    states,
    symbols,
    transitions,
    // transitions: Array(states.length).fill(Array(symbols.length).fill("")),
    input: Array(15).fill(symbols[0]),
    state: states[0],
    offset: 0,
  };
};

const setValueAtIndex = <T>(array: T[], index: number, value: T) => {
  return array.map((v, i) => (i === index ? value : v));
};

const removeAtIndex = <T>(array: T[], index: number) => {
  return array.filter((_, i) => i !== index);
};

export const useMachineStore = create<TMachineState>()(
  persist(
    (set) => ({
      ...createMachine(),
      changeState: (i, value) => {
        set((state) => ({
          states: setValueAtIndex(state.states, i, value),
        }));
      },
      changeSymbol: (i, value) => {
        set((state) => ({
          symbols: setValueAtIndex(state.symbols, i, value),
        }));
      },
      changeTransition: (i, j, value) => {
        set((state) => ({
          transitions: setValueAtIndex(
            state.transitions,
            i,
            setValueAtIndex(state.transitions[i], j, value),
          ),
        }));
      },
      addRow: () => {
        set((state) => ({
          states: [...state.states, ""],
          transitions: [
            ...state.transitions,
            Array(state.symbols.length).fill(""),
          ],
        }));
      },
      removeRow: (i) => {
        set((state) => ({
          states: removeAtIndex(state.states, i),
          transitions: removeAtIndex(state.transitions, i),
        }));
      },
      addColumn: () => {
        set((state) => ({
          symbols: [...state.symbols, ""],
          transitions: state.transitions.map((r) => [...r, ""]),
        }));
      },
      removeColumn: (i) => {
        set((state) => ({
          symbols: removeAtIndex(state.symbols, i),
          transitions: state.transitions.map((r) => removeAtIndex(r, i)),
        }));
      },
      changeInput: (i, value) => {
        set((state) => ({
          input: setValueAtIndex(state.input, i, value),
        }));
      },
      makeTransition: (nextInput, nextState, nextOffset) => {
        set(() => ({
          input: nextInput,
          state: nextState,
          offset: nextOffset,
        }));
      },
    }),
    {
      name: "table-storage",
      partialize: (state) => ({
        states: state.states,
        symbols: state.symbols,
        transitions: state.transitions,
      }),
    },
  ),
);
