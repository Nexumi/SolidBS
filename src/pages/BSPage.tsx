import { createMemo, createSignal } from "solid-js";
import Items from "../components/Items";
import LoadButtons from "../components/LoadButtons";
import Loading from "../components/Loading";
import Totals from "../components/Totals";
import { Addon, Item } from "../utils/types";
import { parseURL } from "../utils/utils";

export default function BSPage() {
  const { fee: f, tax: ta, tip: ti, items: i } = parseURL();
  const [fee, setFee] = createSignal<Addon>(f);
  const [tax, setTax] = createSignal<Addon>(ta);
  const [tip, setTip] = createSignal<Addon>(ti);
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
        <LoadButtons
          setFee={setFee}
          setTax={setTax}
          setTip={setTip}
          setItems={setItems}
        />
        <Totals
          fee={fee()}
          setFee={setFee}
          tax={tax()}
          setTax={setTax}
          tip={tip()}
          setTip={setTip}
          items={items()}
          participants={participants()}
        />

        <Loading />
      </div>
    </>
  );
}
