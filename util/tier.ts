import { Bronze, Gold, Platinum, Silver, Diamond } from "@/assets/images";
import { StaticImageData } from "next/image";

export function judgeTier(exp: number | undefined): string {
  if (exp === undefined) {
    return "Bronze";
  }

  if (exp >= 0 && exp < 350) {
    return "Bronze";
  } else if (exp >= 350 && exp < 500) {
    return "Silver";
  } else if (exp >= 500 && exp < 850) {
    return "Gold";
  } else if (exp >= 850 && exp < 1300) {
    return "Platinum";
  } else if (exp >= 1300) {
    return "Diamond";
  } else {
    return "Bronze";
  }
}

export function judgeTierImageAssets(tier: string): StaticImageData {
  switch (tier) {
    case "Bronze":
      return Bronze;
    case "Silver":
      return Silver;
    case "Gold":
      return Gold;
    case "Platinum":
      return Platinum;
    case "Diamond":
      return Diamond;
    default:
      return Bronze;
  }
}