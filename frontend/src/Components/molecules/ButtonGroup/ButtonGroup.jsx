import React from "react";
import ModalDialog from "../DialogBox/dialogBox";
import ButtonAtom from "../../atoms/Button";
import { Link } from "react-router-dom";

function ButtonGroup({ buttonConfig }) {
  return (
    <>
      {buttonConfig.type &&
      buttonConfig.type === "link" &&
      buttonConfig.to !== "" ? (
        <Link to={buttonConfig.to} key={buttonConfig.innerText}>
          <ModalDialog buttonConfig={buttonConfig} />
        </Link>
      ) : buttonConfig.subButton ? (
        <ModalDialog key={buttonConfig.innerText} buttonConfig={buttonConfig} />
      ) : (
        <ButtonAtom key={buttonConfig.innerText} config={buttonConfig} />
      )}
    </>
  );
}

export default ButtonGroup;
