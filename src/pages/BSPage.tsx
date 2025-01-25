import { createMemo, createSignal } from "solid-js";
import Items from "../components/Items";
import LoadButtons from "../components/LoadButtons";
import Loading from "../components/Loading";
import SplitResults from "../components/SplitResults";
import Totals from "../components/Totals";
import { Item } from "../utils/types";
import { parseURL } from "../utils/utils";

export default function BSPage() {
  const [items, setItems] = createSignal<Item[]>(parseURL());
  const participants = createMemo(() =>
    items()
      .reduce((p: string[], item) => {
        item.participants.forEach(
          (participant) => !p.includes(participant) && p.push(participant)
        );
        return p;
      }, [])
      .sort()
  );

  return (
    <>
      <div class="flex flex-col items-start m-4 gap-y-2">
        <Items
          participants={participants()}
          items={items()}
          onChange={() => {
            const records = items().filter(
              (item) => item.name || item.price || item.participants.length
            );
            records.push({
              name: "",
              price: "",
              participants: [],
            });
            setItems(records);
          }}
        />
        <LoadButtons setItems={setItems} />
        <Totals items={items()} />

        <SplitResults items={items()} participants={participants()} />

        <Loading />
      </div>
    </>
  );
}
