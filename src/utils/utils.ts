import { Item, Mode, ParamType } from "./types";

export function parseURL(url: string = window.location.href) {
  const result: Item[] = [];

  const urlParams = new URLSearchParams(new URL(url).searchParams);

  const names: string[] = eval(urlParams.get(ParamType.NAMES) || "[]");
  const prices: string[] = eval(urlParams.get(ParamType.PRICES) || "[]");
  const items: string[] = eval(urlParams.get(ParamType.ITEMS) || "[]");
  const extra: string[] = eval(urlParams.get(ParamType.EXTRA) || "[]");

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

  return {
    fee: {
      mode: extra.length === 4 ? Mode.DOLLAR : extra[0],
      amount: extra.length === 4 ? "" : extra[1],
    },
    tax: {
      mode: extra[extra.length === 4 ? 0 : 2],
      amount: extra[extra.length === 4 ? 1 : 3],
    },
    tip: {
      mode: extra[extra.length === 4 ? 2 : 4],
      amount: extra[extra.length === 4 ? 3 : 5],
    },
    items: result,
  };
}

export function priceToFloat(price?: string) {
  return parseFloat(price?.replace("$", "") || "0") || 0;
}
