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
    "w-full h-[34px] p-0 bg-white text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[0.25rem] text-md";

  const [price, setPrice] = createSignal(props.item.price);

  return (
    <>
      <div class="flex w-full max-w-none sm:max-w-sm bg-gray-100 rounded-xl border">
        <div class="flex flex-col w-11/12 gap-y-4 m-4">
          <Input
            class={columnField}
            placeholder="Item Name"
            value={props.item.name}
            onChange={(e) => {
              props.item.name = e.target.value;
              props.onChange?.();
            }}
          />
          <Input
            class={columnField}
            classList={{
              "border-red-500 bg-red-50": isNaN(
                Number(price().replace("$", ""))
              ),
            }}
            placeholder="Item Price"
            value={price()}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.\/*-+()%]/g, "");
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
