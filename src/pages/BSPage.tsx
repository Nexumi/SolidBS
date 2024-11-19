import { createSignal } from "solid-js";
import Items from "../components/Items";
import LoadButtons from "../components/LoadButtons";
import Loading from "../components/Loading";
import Participants from "../components/Participants";
import SplitResults from "../components/SplitResults";
import Totals from "../components/Totals";

export default function BSPage() {
  const [participants, setParticipants] = createSignal<string[]>([]);

  return (
    <>
      <div class="m-4 space-y-2">
        <Participants setParticipants={setParticipants} />

        <Items participants={participants} />
        <LoadButtons />
        <Totals />

        <SplitResults />

        <Loading />
      </div>
    </>
  );
}
