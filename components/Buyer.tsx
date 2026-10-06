"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Buyer, SampleOrder, ShipTo, demoOrders, newOrderId, totals } from "@/lib/buyer";

interface Ctx {
  ready: boolean;
  buyer: Buyer | null;
  orders: SampleOrder[];
  signUp: (b: Omit<Buyer, "id" | "verifiedAt" | "createdAt">) => Buyer;
  signIn: (email: string) => Buyer;
  signOut: () => void;
  withdraw: () => void;
  updateBuyer: (patch: Partial<Buyer>) => void;
  placeOrder: (items: string[], shipTo: ShipTo, card: string) => SampleOrder;
}

const BuyerCtx = createContext<Ctx | null>(null);
export const useBuyer = () => useContext(BuyerCtx)!;

const BUYER_KEY = "klow.buyer";
const ORDERS_KEY = "klow.orders";
const LAST_KEY = "klow.buyer.last"; // profile kept across sign-out so a mock sign-in can restore it
export const DEMO_EMAIL = "buyer@welkit.com"; // the header's one-click sign-in (design mock)

export function BuyerProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [orders, setOrders] = useState<SampleOrder[]>([]);

  useEffect(() => {
    try {
      const b = JSON.parse(localStorage.getItem(BUYER_KEY) ?? "null");
      if (b && typeof b === "object") setBuyer(b);
      const o = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
      if (Array.isArray(o)) setOrders(o);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (buyer) localStorage.setItem(BUYER_KEY, JSON.stringify(buyer));
      else localStorage.removeItem(BUYER_KEY);
    } catch {}
  }, [buyer, ready]);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch {}
  }, [orders, ready]);

  const value: Ctx = {
    ready,
    buyer,
    orders,
    signUp: (b) => {
      const now = Date.now();
      const full: Buyer = { ...b, id: `b_${now.toString(36)}`, verifiedAt: now, createdAt: now };
      setBuyer(full);
      setOrders((xs) => (xs.length ? xs : demoOrders(full)));
      return full;
    },
    signIn: (email) => {
      // Mock: any credentials sign in as a demo buyer, keeping a previously saved profile if the e-mail matches.
      const now = Date.now();
      let b: Buyer | null = null;
      try { b = JSON.parse(localStorage.getItem(BUYER_KEY) ?? localStorage.getItem(LAST_KEY) ?? "null"); } catch {}
      const full: Buyer =
        b && b.email.toLowerCase() === email.trim().toLowerCase()
          ? b
          : {
              id: `b_${now.toString(36)}`,
              name: "Welkit Buyer",
              email,
              dial: "+1",
              phone: "415 555 0132",
              country: "US",
              company: "welkit",
              businessType: "online",
              currency: "USD",
              channels: ["own_store", "amazon_us"],
              interestedBrands: ["haeum", "morae"],
              certFileName: "business-registration.pdf",
              website: "welkit.com",
              verifiedAt: now - 40 * 86_400_000,
              createdAt: now - 40 * 86_400_000,
            };
      setBuyer(full);
      setOrders((xs) => (xs.length ? xs : demoOrders(full)));
      return full;
    },
    signOut: () => {
      try { if (buyer) localStorage.setItem(LAST_KEY, JSON.stringify(buyer)); } catch {}
      setBuyer(null);
    },
    withdraw: () => {
      setBuyer(null);
      setOrders([]);
      try { localStorage.removeItem(ORDERS_KEY); localStorage.removeItem(LAST_KEY); } catch {}
    },
    updateBuyer: (patch) => setBuyer((b) => (b ? { ...b, ...patch } : b)),
    placeOrder: (items, shipTo, card) => {
      const t = totals(items);
      const o: SampleOrder = { id: newOrderId(), items, ...t, status: "requested", placedAt: Date.now(), shipTo, card };
      setOrders((xs) => [o, ...xs]);
      return o;
    },
  };

  return <BuyerCtx.Provider value={value}>{children}</BuyerCtx.Provider>;
}
