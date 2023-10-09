import { createContext, useContext } from "react";
import styled from "styled-components";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
const StyledTable = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 0.54rem;
  align-items: center;
  text-align: left;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: rgba(40, 42, 46, 0.5);
  border-bottom: 0.05rem solid #272a30;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: grey;
`;

const StyledRow = styled(CommonRow)`
  padding: 0.45rem 2.4rem;
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
  border-bottom: 0.05rem solid #272a30;
  font-size: 0.75rem;
  &:not(:last-child) {
    border-bottom: 0.05rem solid #272a30;
  }
`;


const Footer = styled.footer`
  background-color: rgba(40, 42, 46, 0.5);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
        {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {

  if (!data?.length) return <EmptyIcon />;

  return <>{data.map(render)}</>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
