import { createMemo, createSignal } from "solid-js";
import Items from "../components/Items";
import LoadButtons from "../components/LoadButtons";
import Loading from "../components/Loading";
import Totals from "../components/Totals";
import { Item } from "../utils/types";
import { parseURL } from "../utils/utils";

export default function BSPage() {
  const { fee, tax, tip, items: i } = parseURL();
  const [items, setItems] = createSignal<Item[]>(i);
  const participants = createMemo(() =>
    items()
      .reduce((p: string[], item) => {
        item.participants.forEach(
          (participant) => !p.includes(participant) && p.push(participant),
        );
        return p;
      }, [])
      .sort(),
  );

  return (
    <>
      <div class="m-4 flex flex-col items-start gap-y-2">
        <Items
          participants={participants()}
          items={items()}
          onChange={() => {
            const records = items().filter(
              (item) => item.name || item.price || item.participants.length,
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
        <Totals
          addons={{ fee, tax, tip }}
          items={items()}
          participants={participants()}
        />

        <Loading />
      </div>
    </>
  );
}
