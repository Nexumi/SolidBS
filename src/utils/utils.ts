import { Item, ParamType } from "./types";

export function parseURL(url: string = window.location.href) {
  const result: Item[] = [];

  const urlParams = new URLSearchParams(new URL(url).searchParams);

  const names: string[] = eval(urlParams.get(ParamType.NAMES) || "[]");
  const prices: string[] = eval(urlParams.get(ParamType.PRICES) || "[]");
  const items: string[] = eval(urlParams.get(ParamType.ITEMS) || "[]");

  const maxLength = Math.max(names.length, prices.length, items.length);

  for (let i = 0; i < maxLength; i++) {
    result.push({
      name: items[i],
      price: prices[i].startsWith("$") ? prices[i] : `$${prices[i]}`,
      participants: names[i].split(", "),
    });
  }

  result.push({
    name: "",
    price: "",
    participants: [],
  });

  return result;
}
