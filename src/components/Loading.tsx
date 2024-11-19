import { Show } from "solid-js";

export default function Loading() {
  return (
    <>
      <Show when={false}>
        <div class="lds">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Show>
    </>
  );
}
