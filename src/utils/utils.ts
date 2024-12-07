import { Item, ParamType } from "./types";

export function parseURL(url: string = window.location.href) {
  const result: Item[] = [];

  const urlParams = new URLSearchParams(new URL(url).searchParams);

  const names = eval(urlParams.get(ParamType.NAMES) || "[]");
  const prices = eval(urlParams.get(ParamType.PRICES) || "[]");
  const items = eval(urlParams.get(ParamType.ITEMS) || "[]");

  const maxLength = Math.max(names.length, prices.length, items.length);

  for (let i = 0; i < maxLength; i++) {
    result.push({
      name: items[i],
      price: prices[i],
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
