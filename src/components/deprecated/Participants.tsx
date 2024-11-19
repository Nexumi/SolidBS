import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import { Setter } from "solid-js";

/**
 * @deprecated Integrated in ItemCard
 **/
export default function Participants(props: {
  setParticipants: Setter<string[]>;
}) {
  return (
    <>
      <Select
        class="bg-white rounded-md"
        multiple
        emptyPlaceholder=""
        {...createOptions([], {
          createable: true,
        })}
        placeholder="Participants"
        onChange={(value: Array<string>) => {
          props.setParticipants(value);
        }}
      />
    </>
  );
}
