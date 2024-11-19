import { createOptions, Select } from "@thisbeyond/solid-select";
import { Accessor, createSignal, Setter } from "solid-js";
import { Flex } from "./ui/flex";
import { Input } from "./ui/input";

export default function ItemCard(props: {
  participants: Accessor<string[]>;
  setParticipants: Setter<string[]>;
}) {
  const columnField =
    "h-[34px] p-0 bg-white text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md text-md";

  const [selected, setSelected] = createSignal<string[]>([]);

  return (
    <>
      <Flex
        justifyContent="center"
        class="max-w-sm bg-gray-100 rounded-xl border"
      >
        <div class="w-11/12 space-y-4 m-4">
          <Input class={columnField} placeholder="Item Name" />
          <Input class={columnField} placeholder="Item Price" />
          <Select
            class={columnField}
            multiple
            {...createOptions(props.participants(), {
              disable: (value) => {
                return selected().includes(value) || !value.length;
              },
              createable: true,
            })}
            placeholder="Who Got"
            onChange={(value) => {
              setSelected(value);
              props.setParticipants(
                props
                  .participants()
                  .concat(value)
                  .filter(
                    (value, index, array) => array.indexOf(value) === index
                  )
              );
            }}
          />
        </div>
      </Flex>
    </>
  );
}
