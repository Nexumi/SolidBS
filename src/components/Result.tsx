import { createMemo, For } from "solid-js";
import { Item } from "../utils/types";
import { priceToFloat } from "../utils/utils";

export default function Result(props: {
  addons: {
    feePercentage: number;
    taxPercentage: number;
    tipPercentage: number;
  };
  items: Item[];
  participant: string;
}) {
  const items = createMemo(() => {
    const items: Item[] = [];
    props.items.forEach((item) => {
      if (item.participants.includes(props.participant)) {
        items.push({
          name: item.name,
          price: (priceToFloat(item.price) / item.participants.length).toFixed(
            2
          ),
          participants: [props.participant],
        });
      }
    });
    return items;
  });

  const subtotal = createMemo(() => {
    return items().reduce((amount, item) => {
      return amount + parseFloat(item.price);
    }, 0);
  });

  const addons = createMemo(() => {
    return {
      fee:
        parseFloat(
          ((props.addons.feePercentage * subtotal()) / 100).toFixed(2)
        ) || 0,
      tax:
        parseFloat(
          ((props.addons.taxPercentage * subtotal()) / 100).toFixed(2)
        ) || 0,
      tip:
        parseFloat(
          ((props.addons.tipPercentage * subtotal()) / 100).toFixed(2)
        ) || 0,
    };
  });

  return (
    <>
      <div class="text-white">
        <div>
          {props.participant}: $
          {(subtotal() + addons().fee + addons().tax + addons().tip).toFixed(2)}
        </div>
        <div>Fee: ${addons().fee.toFixed(2)}</div>
        <div>Tax: ${addons().tax.toFixed(2)}</div>
        <div>Tip: ${addons().tip.toFixed(2)}</div>
        <For each={items()}>
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
