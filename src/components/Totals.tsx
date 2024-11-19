import { Show, createSignal } from "solid-js";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Totals(props: {
  subtotal?: number;
  total?: number;
  trueTotal?: number;
}) {
  return (
    <>
      <div class="text-white">
        <h2>Subtotal: ${props.subtotal?.toFixed(2) || "0.00"}</h2>
        <InputField label="Fee" />
        <InputField label="Tax" />
        <h2>Total: ${props.total?.toFixed(2) || "0.00"}</h2>
        <InputField label="Tip" />
        <h2>True Total: ${props.trueTotal?.toFixed(2) || "0.00"}</h2>
      </div>
    </>
  );
}

function InputField(props: { label: string; value?: number }) {
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
            id="tip_dollar"
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
        />
        <Show when={mode() === "%"}>
          <Button
            class={`${buttonClass} border-l-0 rounded-r-md`}
            id="tip_percent"
            onclick={() => setMode("$")}
          >
            %
          </Button>
        </Show>
      </h3>
      <h3>
        {props.label}: ${props.value?.toFixed(2) || "0.00"}
      </h3>
    </>
  );
}
