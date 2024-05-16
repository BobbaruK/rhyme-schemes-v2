"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type DeckStore,
  createDeckStore,
  initDeckStore,
} from "@/stores/deck-store";

export const CounterStoreContext = createContext<StoreApi<DeckStore> | null>(
  null,
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const DeckStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<DeckStore>>();
  if (!storeRef.current) {
    storeRef.current = createDeckStore(initDeckStore());
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useDeckStore = <T,>(
  selector: (store: DeckStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
