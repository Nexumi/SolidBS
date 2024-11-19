import { createOptions, Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import { Accessor, createSignal, Setter } from "solid-js";
import { Flex } from "../ui/flex";
import { Input } from "../ui/input";

/**
 * @deprecated Replaced with ItemCard
 **/
export default function ItemRow(props: {
  participants: Accessor<string[]>;
  setParticipants: Setter<string[]>;
}) {
  const columnField =
    "w-full h-[34px] p-0 m-1 bg-white text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md text-md";

  const [selected, setSelected] = createSignal<string[]>([]);

  return (
    <>
      <Flex>
        <Select
          class={columnField}
          multiple
          {...createOptions(props.participants(), {
            disable: (value) => {
              return selected().includes(value) || !value.length;
            },
          })}
          placeholder=""
          onChange={(value) => {
            setSelected(value);
          }}
        />
        <Input class={columnField} />
        <Input class={columnField} />
      </Flex>
    </>
  );
}
