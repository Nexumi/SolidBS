import { createMemo, createSignal } from "solid-js";
import { Addon, Item, Mode } from "../utils/types";
import { priceToFloat } from "../utils/utils";
import InputField from "./InputField";
import SplitResults from "./SplitResults";

export default function Totals(props: {
  addons: {
    fee: Addon;
    tax: Addon;
    tip: Addon;
  };
  items: Item[];
  participants: string[];
}) {
  const [fee, setFee] = createSignal<string>(props.addons.fee.amount);
  const [feeMode, setFeeMode] = createSignal<string>(
    props.addons.fee.mode || Mode.DOLLAR
  );
  const [tax, setTax] = createSignal<string>(props.addons.tax.amount);
  const [taxMode, setTaxMode] = createSignal<string>(
    props.addons.tax.mode || Mode.DOLLAR
  );
  const [tip, setTip] = createSignal<string>(props.addons.tip.amount);
  const [tipMode, setTipMode] = createSignal<string>(
    props.addons.tip.mode || Mode.DOLLAR
  );

  const subtotal = createMemo(() => {
    return (
      props.items.reduce((price, item) => {
        return price + (parseFloat(item.price.replace("$", "")) || 0);
      }, 0) || 0
    );
  });

  const total = createMemo(() => {
    const parsedFee = priceToFloat(fee());
    const parsedTax = priceToFloat(tax());
    const parsedTip = priceToFloat(tip());

    const calculatedFee =
      feeMode() === Mode.DOLLAR ? parsedFee : (parsedFee * subtotal()) / 100;
    const calculatedTax =
      taxMode() === Mode.DOLLAR ? parsedTax : (parsedTax * subtotal()) / 100;
    const calculatedTip =
      tipMode() === Mode.DOLLAR ? parsedTip : (parsedTip * subtotal()) / 100;

    return subtotal() + calculatedFee + calculatedTax + calculatedTip;
  });

  return (
    <>
      <div class="text-white">
        <div>Subtotal: ${subtotal().toFixed(2) || "0.00"}</div>
        <InputField
          label="Fee"
          value={fee()}
          mode={feeMode()}
          subtotal={subtotal()}
          onChange={(value, mode) => {
            setFee(value);
            setFeeMode(mode);
          }}
        />
        <InputField
          label="Tax"
          value={tax()}
          mode={taxMode()}
          subtotal={subtotal()}
          onChange={(value, mode) => {
            setTax(value);
            setTaxMode(mode);
          }}
        />
        <InputField
          label="Tip"
          value={tip()}
          mode={tipMode()}
          subtotal={subtotal()}
          onChange={(value, mode) => {
            setTip(value);
            setTipMode(mode);
          }}
        />
        <div>Total: ${total().toFixed(2) || "0.00"}</div>
      </div>

      <SplitResults
        addons={{
          feePercentage:
            feeMode() === Mode.DOLLAR
              ? (parseFloat(fee()) / subtotal()) * 100
              : parseFloat(fee()),
          taxPercentage:
            taxMode() === Mode.DOLLAR
              ? (parseFloat(tax()) / subtotal()) * 100
              : parseFloat(tax()),
          tipPercentage:
            tipMode() === Mode.DOLLAR
              ? (parseFloat(tip()) / subtotal()) * 100
              : parseFloat(tip()),
        }}
        items={props.items}
        participants={props.participants}
      />
    </>
  );
}
