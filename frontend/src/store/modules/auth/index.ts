import { create } from "zustand";
import persist from "../../../utils/persist";
import { decodeToken, isTokenExpired } from "../../../utils/auth";
import useSafeStore from "../safe/index.ts";
import useProposalStore from "../proposal/index.ts";
import useDashboardStore from "../dashboard/index.ts";


interface User {
  daoId: string;
  address: string;
  authToken: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>(
  //@ts-ignore
  persist(
    {
      key: "auth",
      allowlist: ["user", "isAuthenticated"],
    },
    //@ts-ignore
    (set: Function) => ({
      user: null,
      isAuthenticated: false,
      login: async (authToken: string) => {
        const decodedToken = await decodeToken(authToken);
        const { address, daoId } = decodedToken;
        if (isTokenExpired(decodedToken)) {
          set(() => ({
            user: null,
            isAuthenticated: false,
          }));
          return;
        }
        set(() => ({
          user: {
            authToken,
            address,
            daoId,
          },
          isAuthenticated: true,
        }));
      },
      logout: async() => {
        await useSafeStore.getState().reset();
        await useProposalStore.getState().reset();
        await useDashboardStore.getState().reset();
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));
      },
    })
  )
);

export default useAuthStore;
