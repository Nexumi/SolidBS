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
    "inline h-auto w-auto rounded-none bg-white p-0 text-center text-black focus-visible:ring-0 focus-visible:ring-offset-0";
  const buttonClass =
    "h-auto rounded-none border border-gray-200 bg-white px-2 py-0 text-black hover:bg-gray-100";

  const displayValue = createMemo(() => {
    const value = parseFloat(props.value || "0");
    const subtotal = parseFloat(String(props.subtotal) || "0");

    if (props.mode === Mode.DOLLAR) {
      return parseFloat(((value / subtotal) * 100).toFixed(2));
    } else {
      return ((value * subtotal) / 100).toFixed(2);
    }
  });

  return (
    <>
      <div>
        {props.label}:{" "}
        <Show when={props.mode === Mode.DOLLAR}>
          <Button
            class={`${buttonClass} rounded-l-md border-r-0`}
            onclick={() => {
              props.onChange?.(props.value || "", Mode.PERCENTAGE);
            }}
          >
            $
          </Button>
        </Show>
        <Input
          class={inputField}
          classList={{
            "rounded-r-md": props.mode === Mode.DOLLAR,
            "rounded-l-md": props.mode === Mode.PERCENTAGE,
          }}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.\/*\-+()%]/g, "");
            props.onChange?.("", props.mode || Mode.DOLLAR);
            try {
              props.onChange?.(
                evaluate(value).toFixed(2),
                props.mode || Mode.DOLLAR,
              );
            } catch {
              props.onChange?.(value, props.mode || Mode.DOLLAR);
            }
          }}
          value={props.value}
        />
        <Show when={props.mode === Mode.PERCENTAGE}>
          <Button
            class={`${buttonClass} rounded-r-md border-l-0`}
            onclick={() => {
              props.onChange?.(props.value || "", Mode.DOLLAR);
            }}
          >
            %
          </Button>
        </Show>
      </div>
      <div>
        {props.label}: {props.mode === Mode.PERCENTAGE ? "$" : ""}
        {displayValue() || (props.mode === Mode.DOLLAR ? "0" : "0.00")}
        {props.mode === Mode.DOLLAR ? "%" : ""}
      </div>
    </>
  );
}
