import { Accessor, For, Setter } from "solid-js";
import ItemCard from "./ItemCard";
import { Flex } from "./ui/flex";

export default function Items(props: {
  participants: Accessor<string[]>;
  setParticipants: Setter<string[]>;
}) {
  return (
    <>
      <Flex justifyContent="start" class="space-x-2">
        <For each={[...Array(2)]}>
          {() => (
            <ItemCard
              participants={props.participants}
              setParticipants={props.setParticipants}
            />
          )}
        </For>
      </Flex>
    </>
  );
}
