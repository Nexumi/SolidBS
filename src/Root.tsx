import { Route } from "@solidjs/router";
import BSPage from "./pages/BSPage";

export default function Root() {
  return (
    <>
      <Route path="/" component={BSPage} />
    </>
  );
}