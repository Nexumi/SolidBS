import { Accessor, Setter, Show, createMemo, createSignal } from "solid-js";
import { Item } from "../utils/types";
import { priceToFloat } from "../utils/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Totals(props: { items?: Accessor<Item[]> }) {
  const subtotal = createMemo(() => {
    return (
      props.items?.().reduce((price, item) => {
        return price + (parseFloat(item.price.replace("$", "")) || 0);
      }, 0) || 0
    );
  });

  const [fee, setFee] = createSignal<string>("");
  const [tax, setTax] = createSignal<string>("");
  const [tip, setTip] = createSignal<string>("");

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
        <InputField label="Fee" />
        <InputField label="Tax" />
        <InputField label="Tip" />
        <h2>Total: ${total().toFixed(2) || "0.00"}</h2>
      </div>
    </>
  );
}

function InputField(props: {
  label?: string;
  value?: string;
  onChange?: () => void;
}) {
  const inputField =
    "w-auto h-auto inline p-0 bg-white text-black text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none";
  const buttonClass =
    "border border-gray-200 bg-white text-black hover:bg-gray-100 h-auto px-2 py-0 rounded-none";

  const [mode, setMode] = createSignal("$");

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
          onChange={props.onChange}
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
        {props.label}: ${props.value || "0.00"}
      </h3>
    </>
  );
}
