import { atom } from "jotai";
import { ExpTier } from "@/model/exp-tier";

export const expTierAtom = atom<ExpTier>(
  {
    previousExp: 0,
    currentExp: 0,
    tier: "Bronze",
  }
);
