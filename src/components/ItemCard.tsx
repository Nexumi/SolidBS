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
            classList={{
              "border-red-500 bg-red-50": isNaN(
                Number(props.item.price.replace("$", ""))
              ),
            }}
            placeholder="Item Price"
            value={props.item.price}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.\/*-+()%]/g, "");
              props.item.price = value;
              try {
                props.item.price = "$" + evaluate(value).toFixed(2);
              } catch {
                props.item.price = value;
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
