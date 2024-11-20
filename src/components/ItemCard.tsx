import { createOptions, Select } from "@thisbeyond/solid-select";
import { evaluate } from "mathjs";
import { Item } from "../utils/types";
import { Flex } from "./ui/flex";
import { Input } from "./ui/input";

export default function ItemCard(props: {
  participants: string[];
  item: Item;
  onChange?: () => void;
}) {
  const columnField =
    "h-[34px] p-0 bg-white text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md text-md";

  return (
    <>
      <Flex
        justifyContent="center"
        class="max-w-sm bg-gray-100 rounded-xl border"
      >
        <div class="w-11/12 space-y-4 m-4">
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
            placeholder="Item Price"
            value={props.item.price}
            onChange={(e) => {
              props.item.price = e.target.value;
              try {
                props.item.price = evaluate(e.target.value).toFixed(2);
              } catch {
                props.item.price = "";
              }
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
      </Flex>
    </>
  );
}
