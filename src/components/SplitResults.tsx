import { Show } from "solid-js";
import { Item } from "../utils/types";
import { Button } from "./ui/button";

export default function SplitResults(props: {
  items: Item[];
  participants: string[];
}) {
  const buttonClass =
    "border-2 border-gray-400 bg-white text-black hover:bg-gray-200 h-auto px-2 py-1";

  return (
    <>
      <Show when={props.participants.length}>
        <div class="mt-[50px]"></div>
        <Button class={buttonClass} id="share">
          Share
        </Button>
      </Show>
    </>
  );
}
