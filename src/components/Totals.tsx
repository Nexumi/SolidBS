import { createMemo, createSignal } from "solid-js";
import { Item, Mode } from "../utils/types";
import { priceToFloat } from "../utils/utils";
import InputField from "./InputField";

export default function Totals(props: { items: Item[] }) {
  const [fee, setFee] = createSignal<string>("");
  const [feeMode, setFeeMode] = createSignal<string>(Mode.DOLLAR);
  const [tax, setTax] = createSignal<string>("");
  const [taxMode, setTaxMode] = createSignal<string>(Mode.DOLLAR);
  const [tip, setTip] = createSignal<string>("");
  const [tipMode, setTipMode] = createSignal<string>(Mode.DOLLAR);

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
    </>
  );
}
