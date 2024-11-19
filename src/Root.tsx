import { Navigate, Route } from "@solidjs/router";
import BSPage from "./pages/BSPage";

export default function Root() {
  return (
    <>
      <Route path="/" component={BSPage} />
      <Route path="/*" component={() => <Navigate href={"/"} />} />
    </>
  );
}
