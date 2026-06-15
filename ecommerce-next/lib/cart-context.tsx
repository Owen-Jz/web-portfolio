"use client";

import {
  createContext, useContext, useState, useEffect, useCallback, ReactNode,
} from "react";
import { products, type Product } from "./products";

export type CartLine = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (slug: string, size: string, color: string) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "vesper.cart.v1";

const sameLine = (a: CartLine, b: { slug: string; size: string; color: string }) =>
  a.slug === b.slug && a.size === b.size && a.color === b.color;

const findProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)); } catch {}
  }, [lines, hydrated]);

  const add = useCallback((line: CartLine) => {
    setLines((cur) => {
      const idx = cur.findIndex((l) => sameLine(l, line));
      if (idx >= 0) {
        const next = [...cur];
        next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
        return next;
      }
      return [...cur, line];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string, size: string, color: string) => {
    setLines((cur) => cur.filter((l) => !sameLine(l, { slug, size, color, qty: 0 })));
  }, []);

  const setQty = useCallback((slug: string, size: string, color: string, qty: number) => {
    setLines((cur) => cur.map((l) =>
      sameLine(l, { slug, size, color, qty: 0 })
        ? { ...l, qty: Math.max(1, qty) }
        : l
    ));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = lines.reduce((sum, l) => {
    const p = findProduct(l.slug);
    return sum + (p?.price ?? 0) * l.qty;
  }, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const value: CartCtx = {
    lines, add, remove, setQty, clear,
    subtotal, count,
    isOpen,
    open:   () => setIsOpen(true),
    close:  () => setIsOpen(false),
    toggle: () => setIsOpen((o) => !o),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
};
