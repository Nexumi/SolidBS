import { createOptions, Select } from "@thisbeyond/solid-select";
import { evaluate } from "mathjs";
import { createSignal } from "solid-js";
import { Item } from "../utils/types";
import { Input } from "./ui/input";

export default function ItemCard(props: {
  participants: string[];
  item: Item;
  onChange?: () => void;
}) {
  const columnField =
    "text-md w-full rounded-[0.25rem] bg-white p-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0";

  const [price, setPrice] = createSignal(props.item.price);

  return (
    <>
      <div class="w-full max-w-none rounded-xl border bg-gray-100 sm:max-w-sm">
        <div class="m-4 flex w-11/12 flex-col gap-y-4">
          <Input
            class={`${columnField} h-[33.333px]`}
            placeholder="Item Name"
            value={props.item.name}
            onChange={(e) => {
              props.item.name = e.target.value;
              props.onChange?.();
            }}
          />
          <Input
            class={`${columnField} h-[33.333px]`}
            classList={{
              "border-red-500 bg-red-50": isNaN(
                Number(price().replace("$", "")),
              ),
            }}
            placeholder="Item Price"
            value={price()}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.\/*\-+()%]/g, "");
              try {
                props.item.price = "$" + evaluate(value).toFixed(2);
              } catch {
                props.item.price = value;
              }
              setPrice(props.item.price);
              props.onChange?.();
            }}
          />
          <Select
            class={columnField}
            multiple
            initialValue={props.item.participants}
            {...createOptions(props.participants, {
              disable: (value) => {
                return props.item.participants.includes(value);
              },
              createable: true,
            })}
            placeholder="Who Got"
            onChange={(value) => {
              if (props.item.participants.length != value.length) {
                props.item.participants = value;
                props.onChange?.();
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
