import { create } from "zustand";
import persist from "../../../utils/persist";
//Put this initial chain in .env
import { initialChain } from "../../../utils/constants/chains";

interface UtilitiesStore {
  loading: boolean;
  chainId: string;
  onChangeLoading: (loading: boolean) => void;
}

const useUtilitiesStore = create<UtilitiesStore>(
  //@ts-ignore
  persist(
    {
      key: "utilities",
      allowlist: [],
    },
    //@ts-ignore
    (set: Function) => ({
      loading: false,
      chainId: initialChain.id,
      onChangeLoading: (loading: boolean) => {
        set(() => ({
          loading,
        }));
      },
    })
  )
);

export default useUtilitiesStore;
