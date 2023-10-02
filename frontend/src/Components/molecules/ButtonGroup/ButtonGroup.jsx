import React from 'react'
import ModalDialog from '../DialogBox/dialogBox';
import ButtonAtom from '../../atoms/Button';
import { Link } from 'react-router-dom';

function ButtonGroup({buttonConfig}) {
  return (
    <>
      {Object.keys(buttonConfig).map((key, index) => {
        return buttonConfig[key].type &&
          buttonConfig[key].type === "link" &&
          buttonConfig[key].to !== "" ? (
          <Link to={buttonConfig[key].to} key={index}>
            <ModalDialog buttonConfig={buttonConfig[key]} />
          </Link>
        ) : buttonConfig[key].subButton ? (
          <ModalDialog key={index} buttonConfig={buttonConfig[key]} />
        ) : (
          <ButtonAtom key={index} config={buttonConfig[key]} />
        );
      })}
    </>
  );
}

export default ButtonGroup