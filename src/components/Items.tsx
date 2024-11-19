import { Accessor, For, Setter } from "solid-js";
import { Item } from "../utils/types";
import ItemCard from "./ItemCard";
import { Flex } from "./ui/flex";

export default function Items(props: {
  participants: Accessor<string[]>;
  setParticipants: Setter<string[]>;
  onChange?: (item: Item) => void;
}) {
  return (
    <>
      <Flex justifyContent="start" class="space-x-2">
        <For each={[...Array(2)]}>
          {() => (
            <ItemCard
              participants={props.participants}
              setParticipants={props.setParticipants}
              onChange={props.onChange}
            />
          )}
        </For>
      </Flex>
    </>
  );
}
