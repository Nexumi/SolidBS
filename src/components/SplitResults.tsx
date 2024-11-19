import { Show } from "solid-js";
import { Button } from "./ui/button";

export default function SplitResults(props: { results?: object }) {
  const buttonClass =
    "border-2 border-gray-400 bg-white text-black hover:bg-gray-200 h-auto px-2 py-1";

  return (
    <>
      <Show when={props.results}>
        <div class="mt-[50px]"></div>
        <Button class={buttonClass} id="share">
          Share
        </Button>
      </Show>
    </>
  );
}
