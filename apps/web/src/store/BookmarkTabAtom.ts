import { atom } from "jotai";
import { BookmarkTab } from "src/pages/mycave";

const BookmarkTabAtom = atom<BookmarkTab | undefined>(undefined);

export default BookmarkTabAtom;
