import { For, Show } from "solid-js";
import { Item } from "../utils/types";
import Result from "./Result";
import { Button } from "./ui/button";

export default function SplitResults(props: {
  addons: {
    feePercentage: number;
    taxPercentage: number;
    tipPercentage: number;
  };
  items: Item[];
  participants: string[];
}) {
  const buttonClass =
    "border-2 border-gray-400 bg-white text-black hover:bg-gray-200 h-auto px-2 py-1";

  return (
    <>
      <Show when={props.participants.length}>
        <div class="text-white">
          <For each={props.participants}>
            {(participant) => (
              <Result
                addons={{
                  feePercentage: props.addons.feePercentage,
                  taxPercentage: props.addons.taxPercentage,
                  tipPercentage: props.addons.tipPercentage,
                }}
                items={props.items}
                participant={participant}
              />
            )}
          </For>
        </div>
        <Button class={buttonClass} id="share">
          Share
        </Button>
      </Show>
    </>
  );
}
