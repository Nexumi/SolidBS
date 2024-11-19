import { createSignal } from "solid-js";
import Items from "../components/Items";
import LoadButtons from "../components/LoadButtons";
import Loading from "../components/Loading";
import SplitResults from "../components/SplitResults";
import Totals from "../components/Totals";

export default function BSPage() {
  const [participants, setParticipants] = createSignal<string[]>([]);

  return (
    <>
      <div class="m-4 space-y-2">
        <Items participants={participants} setParticipants={setParticipants} />
        <LoadButtons />
        <Totals />

        <SplitResults />

        <Loading />
      </div>
    </>
  );
}
