import { createSignal, onCleanup, onMount, Setter, Show } from "solid-js";
import { getExpandedUrl } from "../utils/requests";
import { Addon, Item } from "../utils/types";
import { parseURL } from "../utils/utils";
import { Button } from "./ui/button";

export default function LoadButtons(props: {
  setFee: Setter<Addon>;
  setTax: Setter<Addon>;
  setTip: Setter<Addon>;
  setItems: Setter<Item[]>;
}) {
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
                const results = parseURL(
                  url.includes("short.jpkit.us") ? getExpandedUrl(url) : url,
                );
                props.setFee(results.fee);
                props.setTax(results.tax);
                props.setTip(results.tip);
                props.setItems(results.items);
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
