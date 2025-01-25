import { evaluate } from "mathjs";
import { Accessor, Show, createMemo, createSignal } from "solid-js";
import { Item } from "../utils/types";
import { priceToFloat } from "../utils/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Totals(props: { items?: Accessor<Item[]> }) {
  const [fee, setFee] = createSignal<string>("");
  const [feeMode, setFeeMode] = createSignal<string>("$");
  const [tax, setTax] = createSignal<string>("");
  const [taxMode, setTaxMode] = createSignal<string>("$");
  const [tip, setTip] = createSignal<string>("");
  const [tipMode, setTipMode] = createSignal<string>("$");

  const subtotal = createMemo(() => {
    return (
      props.items?.().reduce((price, item) => {
        return price + (parseFloat(item.price.replace("$", "")) || 0);
      }, 0) || 0
    );
  });

  const total = createMemo(() => {
    return (
      subtotal() +
      priceToFloat(fee()) +
      priceToFloat(tax()) +
      priceToFloat(tip())
    );
  });

  return (
    <>
      <div class="text-white">
        <h2>Subtotal: ${subtotal().toFixed(2) || "0.00"}</h2>
        <InputField
          label="Fee"
          value={fee()}
          mode={feeMode()}
          onChange={(value, mode) => {
            setFee(value);
            setFeeMode(mode);
          }}
        />
        <InputField
          label="Tax"
          value={tax()}
          mode={taxMode()}
          onChange={(value, mode) => {
            setTax(value);
            setTaxMode(mode);
          }}
        />
        <InputField
          label="Tip"
          value={tip()}
          mode={tipMode()}
          onChange={(value, mode) => {
            setTip(value);
            setTipMode(mode);
          }}
        />
        <h2>Total: ${total().toFixed(2) || "0.00"}</h2>
      </div>
    </>
  );
}

function InputField(props: {
  label?: string;
  value?: string;
  mode?: string;
  subtotal?: string;
  onChange?: (value: string, mode: string) => void;
}) {
  const inputField =
    "w-auto h-auto inline p-0 bg-white text-black text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none";
  const buttonClass =
    "border border-gray-200 bg-white text-black hover:bg-gray-100 h-auto px-2 py-0 rounded-none";

  const [mode, setMode] = createSignal(props.mode || "$");

  const value = createMemo(() => {
    const value = parseFloat(props.value || "0");
    const subtotal = parseFloat(props.subtotal || "0");

    if (mode() === "$") {
      return parseFloat(((value / subtotal) * 100).toFixed(2));
    } else {
      return (value * subtotal).toFixed(2);
    }
  });

  return (
    <>
      <h3>
        {props.label}:{" "}
        <Show when={mode() === "$"}>
          <Button
            class={`${buttonClass} border-r-0 rounded-l-md`}
            onclick={() => setMode("%")}
          >
            $
          </Button>
        </Show>
        <Input
          class={inputField}
          classList={{
            "rounded-r-md": mode() === "$",
            "rounded-l-md": mode() === "%",
          }}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.\/*\-+()%]/g, "");
            try {
              props.onChange?.(evaluate(value).toFixed(2), mode());
            } catch {
              props.onChange?.(value, mode());
            }
          }}
          value={props.value}
        />
        <Show when={mode() === "%"}>
          <Button
            class={`${buttonClass} border-l-0 rounded-r-md`}
            onclick={() => setMode("$")}
          >
            %
          </Button>
        </Show>
      </h3>
      <h3>
        {props.label}: {mode() === "%" ? "$" : ""}
        {value() || (mode() === "$" ? "0" : "0.00")}
        {mode() === "$" ? "%" : ""}
      </h3>
    </>
  );
}
