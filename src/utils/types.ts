export type Item = {
  name: string;
  price: string;
  participants: string[];
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
