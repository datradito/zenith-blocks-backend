import { configurePersist } from "zustand-persist";

const { persist, purge } = configurePersist({
  storage: sessionStorage,
  rootKey: "root",
});
export default persist;
export { purge };