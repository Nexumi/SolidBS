import { For } from "solid-js";
import { Item } from "../utils/types";
import ItemCard from "./ItemCard";
import { Flex } from "./ui/flex";

export default function Items(props: {
  participants: string[];
  items: Item[];
  onChange?: () => void;
}) {
  return (
    <>
      <Flex justifyContent="start" class="flex-wrap gap-2">
        <For each={props.items}>
          {(item) => (
            <ItemCard
              participants={props.participants}
              item={item}
              onChange={props.onChange}
            />
          )}
        </For>
      </Flex>
    </>
  );
}
