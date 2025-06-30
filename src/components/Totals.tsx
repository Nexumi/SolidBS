import { createMemo, Setter } from "solid-js";
import { Addon, Item, Mode } from "../utils/types";
import { priceToFloat } from "../utils/utils";
import InputField from "./InputField";
import SplitResults from "./SplitResults";

export default function Totals(props: {
  fee: Addon;
  setFee: Setter<Addon>;
  tax: Addon;
  setTax: Setter<Addon>;
  tip: Addon;
  setTip: Setter<Addon>;
  items: Item[];
  participants: string[];
}) {
  const subtotal = createMemo(() => {
    return (
      props.items.reduce((price, item) => {
        return price + (parseFloat(item.price.replace("$", "")) || 0);
      }, 0) || 0
    );
  });

  const total = createMemo(() => {
    const parsedFee = priceToFloat(props.fee.amount);
    const parsedTax = priceToFloat(props.tax.amount);
    const parsedTip = priceToFloat(props.tip.amount);

    const calculatedFee =
      props.fee.mode === Mode.DOLLAR
        ? parsedFee
        : (parsedFee * subtotal()) / 100;
    const calculatedTax =
      props.tax.mode === Mode.DOLLAR
        ? parsedTax
        : (parsedTax * subtotal()) / 100;
    const calculatedTip =
      props.tip.mode === Mode.DOLLAR
        ? parsedTip
        : (parsedTip * subtotal()) / 100;

    return subtotal() + calculatedFee + calculatedTax + calculatedTip;
  });

  return (
    <>
      <div class="text-white">
        <div>Subtotal: ${subtotal().toFixed(2) || "0.00"}</div>
        <InputField
          label="Fee"
          value={props.fee.amount}
          mode={props.fee.mode}
          subtotal={subtotal()}
          onChange={(value, mode) => {
            props.setFee({
              amount: value,
              mode,
            });
          }}
        />
        <InputField
          label="Tax"
          value={props.tax.amount}
          mode={props.tax.mode}
          subtotal={subtotal()}
          onChange={(value, mode) => {
            props.setTax({
              amount: value,
              mode,
            });
          }}
        />
        <InputField
          label="Tip"
          value={props.tip.amount}
          mode={props.tip.mode}
          subtotal={subtotal()}
          onChange={(value, mode) => {
            props.setTip({
              amount: value,
              mode,
            });
          }}
        />
        <div>Total: ${total().toFixed(2) || "0.00"}</div>
      </div>

      <SplitResults
        addons={{
          feePercentage:
            props.fee.mode === Mode.DOLLAR
              ? (parseFloat(props.fee.amount) / subtotal()) * 100
              : parseFloat(props.fee.amount),
          taxPercentage:
            props.tax.mode === Mode.DOLLAR
              ? (parseFloat(props.tax.amount) / subtotal()) * 100
              : parseFloat(props.tax.amount),
          tipPercentage:
            props.tip.mode === Mode.DOLLAR
              ? (parseFloat(props.tip.amount) / subtotal()) * 100
              : parseFloat(props.tip.amount),
        }}
        items={props.items}
        participants={props.participants}
      />
    </>
  );
}
