import { evaluate } from "mathjs";
import { createMemo, createSignal, Show } from "solid-js";
import { Mode } from "../utils/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function InputField(props: {
  label?: string;
  value?: string;
  mode?: string;
  subtotal?: string | number;
  onChange?: (value: string, mode: string) => void;
}) {
  const inputField =
    "w-auto h-auto inline p-0 bg-white text-black text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none";
  const buttonClass =
    "border border-gray-200 bg-white text-black hover:bg-gray-100 h-auto px-2 py-0 rounded-none";

  const [mode, setMode] = createSignal<string>(props.mode || Mode.DOLLAR);

  const displayValue = createMemo(() => {
    const value = parseFloat(props.value || "0");
    const subtotal = parseFloat(String(props.subtotal) || "0");

    if (mode() === "$") {
      return parseFloat(((value / subtotal) * 100).toFixed(2));
    } else {
      return ((value * subtotal) / 100).toFixed(2);
    }
  });

  return (
    <>
      <div>
        {props.label}:{" "}
        <Show when={mode() === Mode.DOLLAR}>
          <Button
            class={`${buttonClass} border-r-0 rounded-l-md`}
            onclick={() => {
              setMode(Mode.PERCENTAGE);
              props.onChange?.(props.value || "", mode());
            }}
          >
            $
          </Button>
        </Show>
        <Input
          class={inputField}
          classList={{
            "rounded-r-md": mode() === Mode.DOLLAR,
            "rounded-l-md": mode() === Mode.PERCENTAGE,
          }}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.\/*\-+()%]/g, "");
            props.onChange?.("", mode());
            try {
              props.onChange?.(evaluate(value).toFixed(2), mode());
            } catch {
              props.onChange?.(value, mode());
            }
          }}
          value={props.value}
        />
        <Show when={mode() === Mode.PERCENTAGE}>
          <Button
            class={`${buttonClass} border-l-0 rounded-r-md`}
            onclick={() => {
              setMode(Mode.DOLLAR);
              props.onChange?.(props.value || "", mode());
            }}
          >
            %
          </Button>
        </Show>
      </div>
      <div>
        {props.label}: {mode() === Mode.PERCENTAGE ? "$" : ""}
        {displayValue() || (mode() === Mode.DOLLAR ? "0" : "0.00")}
        {mode() === Mode.DOLLAR ? "%" : ""}
      </div>
    </>
  );
}
