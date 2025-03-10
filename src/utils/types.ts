export type Item = {
  name: string;
  price: string;
  participants: string[];
};

export type Addon = {
  mode: string;
  amount: string;
};

export enum ParamType {
  NAMES = "names",
  PRICES = "prices",
  ITEMS = "items",
  EXTRA = "extra",
  SITEMS = "sitems",
  SPRICES = "sprices",
  EXCLUDE = "exclude",
}

export enum Mode {
  DOLLAR = "$",
  PERCENTAGE = "%",
}
