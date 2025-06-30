import { createSignal, onCleanup, onMount, Setter, Show } from "solid-js";
import { getExpandedUrl } from "../utils/requests";
import { Item } from "../utils/types";
import { parseURL } from "../utils/utils";
import { Button } from "./ui/button";

export default function LoadButtons(props: { setItems: Setter<Item[]> }) {
  const buttonClass =
    "h-auto border bg-white px-2 py-1 text-black hover:bg-gray-200";

  const [online, setOnline] = createSignal(window.navigator.onLine);

  const updateStatus = () => {
    setOnline(window.navigator.onLine);
  };

  onMount(() => {
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
  });

  onCleanup(() => {
    window.removeEventListener("online", updateStatus);
    window.removeEventListener("offline", updateStatus);
  });

  return (
    <>
      <Show when={online()}>
        <div class="flex gap-x-1">
          <input id="file" class="hidden" type="file" accept="image/*" />
          <Button
            class={buttonClass}
            onClick={() => {
              document.getElementById("file")?.click();
            }}
          >
            Upload Receipt
          </Button>
          <Button
            class={buttonClass}
            onClick={() => {
              const url = prompt("Enter URL") || "";
              if (url) {
                if (url.includes("short.jpkit.us")) {
                  props.setItems(parseURL(getExpandedUrl(url)));
                } else {
                  props.setItems(parseURL(url));
                }
              }
            }}
          >
            Load From URL
          </Button>
        </div>
      </Show>
    </>
  );
}
