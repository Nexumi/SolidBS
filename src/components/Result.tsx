import { createMemo, For } from "solid-js";
import { IndividualResult, Item } from "../utils/types";
import { priceToFloat } from "../utils/utils";

export default function Result(props: { items: Item[]; participant: string }) {
  const result = createMemo(() => {
    const result = {
      fee: "",
      tax: "",
      tip: "",
      items: [],
    } as IndividualResult;
    props.items.forEach((item) => {
      if (item.name !== props.participant) return;
      result.items.push({
        name: item.name,
        price: String(priceToFloat(item.price) / item.participants.length),
      });
    });
    return result;
  });

  return (
    <>
      <div class="text-white">
        <div>{props.participant}</div>
        <div>Fee: ${result().fee}</div>
        <div>Tax: ${result().tax}</div>
        <div>Tip: ${result().tip}</div>
        <For each={result().items}>
          {(item) => (
            <div>
              {item.name}: ${item.price}
            </div>
          )}
        </For>
      </div>
    </>
  );
}
