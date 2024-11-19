import { Accessor, For } from "solid-js";
import ItemRow from "./ItemRow";
import { Flex } from "./ui/flex";

export default function Items(props: { participants: Accessor<string[]> }) {
  const columnTitle = "w-full m-1 text-2xl text-center text-white";

  return (
    <>
      <div class="m-0">
        <Flex>
          <p class={columnTitle}>Name</p>
          <p class={columnTitle}>Price</p>
          <p class={columnTitle}>Item</p>
        </Flex>
        <For each={[...Array(2)]}>
          {() => <ItemRow participants={props.participants} />}
        </For>
      </div>
    </>
  );
}
