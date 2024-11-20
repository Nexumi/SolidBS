import { createMemo, createSignal, createUniqueId } from "solid-js";
import Items from "../components/Items";
import LoadButtons from "../components/LoadButtons";
import Loading from "../components/Loading";
import SplitResults from "../components/SplitResults";
import Totals from "../components/Totals";
import { Item } from "../utils/types";

export default function BSPage() {
  const [items, setItems] = createSignal<Item[]>([
    { id: createUniqueId(), name: "", price: "", participants: [] },
  ]);
  const participants = createMemo(() =>
    items().reduce((p: string[], item) => {
      item.participants.forEach(
        (participant) => !p.includes(participant) && p.push(participant)
      );
      return p;
    }, [])
  );

  return (
    <>
      <div class="m-4 space-y-2">
        <Items
          participants={participants()}
          items={items()}
          onChange={() => {
            let records = items();
            records = records.filter(
              (item) => item.name || item.price || item.participants.length
            );
            records.push({
              id: createUniqueId(),
              name: "",
              price: "",
              participants: [],
            });
            setItems([]);
            setItems(records);
          }}
        />
        <LoadButtons />
        <Totals />

        <SplitResults />

        <Loading />
      </div>
    </>
  );
}
