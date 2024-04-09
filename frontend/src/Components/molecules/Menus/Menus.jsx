import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClicks.js";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    text-align: left;
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: white;
  list-style: none;

  right: ${(props) => props.position.x + 50}px;
  top: ${(props) => props.position.y - 70}px;

  /* Add border-radius and margin-left styles */
  border-radius: 10px; /* Adjust the radius as needed */
  padding: 0.5rem;
  
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: 0.75rem;
  transition: all 0.2s;
  padding: 0.65rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border-bottom: 1px solid darkgray;

  &:hover {
    background-color: gray;
  }

  & svg {
    width: 1.2rem;
    height: 1.2rem;
    transition: all 0.3s;
    color: cornflowerblue;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, children }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton onClick={handleClick}>
      {icon}
      {children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
