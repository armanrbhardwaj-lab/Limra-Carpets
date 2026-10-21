import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export type CartItem = { id: string; size: string; material: string; qty: number };
type Ctx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "limra-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = (item: CartItem) =>
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id && p.size === item.size && p.material === item.material);
      if (i >= 0) return prev.map((p, j) => (j === i ? { ...p, qty: Math.min(999, p.qty + item.qty) } : p));
      return [...prev, item];
    });
  const setQty = (i: number, qty: number) =>
    setItems((prev) => prev.map((p, j) => (j === i ? { ...p, qty: Math.max(1, Math.min(999, qty)) } : p)));
  const remove = (i: number) => setItems((prev) => prev.filter((_, j) => j !== i));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + (getProduct(i.id)?.price ?? 0) * i.qty, 0);

  return <CartContext.Provider value={{ items, add, setQty, remove, clear, count, subtotal }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
