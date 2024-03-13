import { create } from "zustand";
import persist from "../../../utils/persist";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { initialChain } from "../../../utils/constants/chains";
import getChain from "../../../Services/Safe/getChain";
import { getERC20Info } from "../../../Services/Safe/getERC20Info.js";
import useAuthStore from "../auth/index.ts";
import useUtilitiesStore from "../utilities/index.ts";

interface ERC20Token {
  address: string;
  symbol: string;
  decimals: number;
  balance?: string;
}

interface Chain {
  id: string;
  token: string;
  rpcUrl: string;
  shortName: string;
  label: string;
  color?: string;
  icon?: string;
  blockExplorerUrl: string;
  transactionServiceUrl?: string;
  isStripePaymentsEnabled: boolean; // only available in Mumbai chain
  isMoneriumPaymentsEnabled: boolean; // only available in Goerli chain
  faucetUrl?: string;
  supportedErc20Tokens?: string[]; // erc20 token contract addresses that can be used to pay transaction fees
}

interface safe {
  ownerAddress?: string;
  chainId: BigInt;
  safes: string[];
  hasLoadedSafes: boolean;
  tokenAddress: string;
  erc20token?: ERC20Token;
  chain?: Chain;
  web3Provider?: ethers.BrowserProvider;
  EthAdapter?: any;
  setEthAdapter?: (address: any, ethAdapter: any) => Promise<void>;
  setChainId: (chainId: string) => void;
  setChain: (chain: Chain) => void;
  safeSelected?: string | null;
  setErc20Token: (erc20token: ERC20Token) => void;
  setSafeSelected: (safeSelected: string) => void;
  setSafes: (safes: string[]) => void;
  safeBalance?: string;
  safeApiKit: SafeApiKit;
  /**
   * Sets the SafeApiKit instance for the given chainId.
   * SafeApiKit provides a JS SDK to interact with Gnosis Safe contracts.
   */
  setSafeApiKit: (chainId: BigInt) => SafeApiKit;
  safeProtocolKit?: any;
  erc20Balances?: Record<string, ERC20Token>;
  setErc20Balances?: (provider: any) => Promise<void>;
  setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
  getSafesOwned: () => Promise<void> | null;
  reset: () => void;
}

const { chainId } = useUtilitiesStore.getState();
const initialSafeState = {
  chainId: chainId,
  tokenAddress: ethers.ZeroAddress,
  safeSelected: null,
  safes: [],
  hasLoadedSafes: false,
  erc20Balances: {},
  erc20token: {
    address: "",
    symbol: "",
    decimals: 0,
    balance: "",
  },
  chain: getChain(chainId) || initialChain,
  safeApiKit: null,
  safeProtocolKit: {},
};

const useSafeStore = create<safe>(
  //@ts-ignore
  persist(
    {
      key: "safe",
      allowlist: [
        "chain",
        "tokenAddress",
        "safeSelected",
        "safes",
        "erc20Balances",
        "erc20token",
        "chainId",
        "safeApiKit",
        "safeProtocolKit",
        "EthAdapter",
        "hasLoadedSafes",
      ],
    },
    //@ts-ignore
    (set: Function, get: Function) => ({
      ...initialSafeState,
      reset: () => {
        set(() => initialSafeState);
      },
      setChainId: (chainId: bigint) => {
        set(() => ({
          chainId,
        }));
      },
      setChain: (chainId: string) => {
        const chain = getChain(chainId);
        set(() => ({
          chain,
        }));
      },
      setTokenAddress: (tokenAddress: string) => {
        set(() => ({
          tokenAddress,
        }));
      },
      setSafeSelected: (safeSelected: string) => {
        set(() => ({
          safeSelected,
        }));
      },
      setSafes: (safes: string[]) => {
        set(() => ({
          safes,
        }));
      },
      getSafesOwned: async () => {
        try {
          const { safeApiKit } = get();
          //in case we need state from another store use hook.getState()
          // hook() called directly like this wont work becasue react hooks can only be called in components not in fn like this
          const authStore = useAuthStore.getState();
          const { user, logout } = authStore;

          if (!user?.address) {
            logout();
            return;
          }
          const { safes } = await safeApiKit.getSafesByOwner(user?.address);
          set(() => ({
            safes,
            hasLoadedSafes: true,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      setSafeApiKit: (chainId: bigint) => {
        const api = new SafeApiKit({ chainId: chainId });
        set(() => ({
          safeApiKit: api,
        }));
      },
      //address don't use here \/
      setEthAdapter: async (provider: any) => {
        //here check the user from useAuthStore state and set the ethAdapter
        let ethAdapter;
        const { user } = useAuthStore.getState();
        if (user?.address) {
          ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: await provider.getSigner(0),
          });
        }
        set(() => ({
          EthAdapter: ethAdapter,
        }));
      },
      setErc20Balances: async (erc20Balances: Record<string, ERC20Token>) => {
        set(() => ({
          erc20Balances,
        }));
      },
      getSafeBalance: async (address: string, provider: any) => {
        const safeSelected = useSafeStore.getState().safeSelected;
        let balance = await provider?.getBalance(safeSelected);
        balance = balance?.toString();
        set(() => ({
          safeBalance: balance,
        }));
      },
    })
  )
);

// useSafeStore.subscribe((state) => {
//   if (useSafeStore.getState()) {
//     useSafeStore.getState().setSafeApiKit(state.chainId);
//     useSafeStore.getState().setEthAdapter(state.chain, state.safeSelected);
//   }
// });

export default useSafeStore;


