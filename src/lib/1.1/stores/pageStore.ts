import { isProduction } from "../../../bookStore";
import { derived, Writable, writable } from "svelte/store";

export type Pages =
  | ""
  | "welcome"
  | "introduction"
  | "calibration"
  | "book"
  | "about"
  | "feedback"
  | "share"
  | "help"
  | "denied";


export const currentPage: Writable<Pages> = writable(
  // isPrduction ? "welcome" : "book"
  "welcome"
);

export const isTopNavOpen = writable(
  // isProduction ? false : true
  false
);

// export const shouldHideCursor = derived([currentPage], ([$currentPage]) => {
//   if ($currentPage === "calibration") return true;
//   if ($currentPage === "book") return true;
//   return false;
// });
