import React from "react";
import { useAccountAbstraction } from "../../../Utility/Providers/AccountAbstractionContext";

import SafeAccount from "./SafeAccount";

function Accounts() {
  const {  getSafesOwned} = useAccountAbstraction();

  return (
    <div>
      <SafeAccount />
    </div>
  );
}

export default Accounts;
