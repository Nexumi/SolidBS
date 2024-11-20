import { For } from "solid-js";
import { Item } from "../utils/types";
import ItemCard from "./ItemCard";

export default function Items(props: {
  participants: string[];
  items: Item[];
  onChange?: () => void;
}) {
  return (
    <>
      <div class="flex w-full flex-wrap gap-2">
        <For each={props.items}>
          {(item) => (
            <ItemCard
              participants={props.participants}
              item={item}
              onChange={props.onChange}
            />
          )}
        </For>
      </div>
    </>
  );
}
