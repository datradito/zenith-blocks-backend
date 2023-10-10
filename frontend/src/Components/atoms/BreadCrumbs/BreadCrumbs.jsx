import { useLocation, Link} from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styled from "styled-components";
import { css } from "styled-components";

const BreadcrumbsContainer = styled.div`
  margin: 1rem auto;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Crumb = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  &:last-child:after {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  color: #ddd;
  text-decoration: none;
  text-transform: uppercase;

  ${({ active }) =>
    active &&
    css`
      color: #dc7125; /* Change color to red when active prop is true */
      font-weight: bold; /* Add additional styles as needed */
    `}
`;



const pages = [
  { name: "Proposals", path: "/proposals" },
  {
    name: "Budgets",
    path: /\/proposals\/([0-9]+([A-Za-z]+[0-9]+)+)\/budgets/i,
  },
  {
    name: "Create Budget",
    path: /\/budgets\/([0-9]+([A-Za-z]+[0-9]+)+)\/create/i,
  },
  { name: "Swap", path: "/swap" },
  { name: "Dashboard", path: "/dashboard" },
  {
    name: "Invoices",
    path: /\/budgets\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}\/invoices/i,
  },
  {
    name: "Create Invoice",
    path: /\/invoices\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}\/create/i,
  },
  { name: "Accounts", path: "/accounts" },
];


const generateBreadcrumbs = (pathname, id) => {

  console.log(id)
  const crumbs = [];

  if (pages[1].path.test(pathname)) {
    crumbs.push(
      { path: "/proposals", name: "Proposals" },
      { path: pathname, name: "Budgets" }
    );
  } 

  if (pages[2].path.test(pathname)) {
    crumbs.push(
      { path: "/proposals", name: "Proposals" },
      { path: `/proposals/${id}/budgets`, name: "Budgets" },
      { path: pathname, name: "Create Budget" }
    );
  }

  if (pages[5].path.test(pathname)) {  
    crumbs.push(
      { path: "/proposals", name: "Proposals" },
      { path: `/proposals/${id}/budgets`, name: "Budgets" },
      { path: pathname, name: "Invoices" }
    );
  }

  if (pages[6].path.test(pathname)) {
    crumbs.push(
      { path: "/proposals", name: "Proposals" },
      { path: `/budgets/${id}/invoices`, name: "Invoices" },
      { path: pathname, name: "Create Invoice" }
    );
  }

  return crumbs;
};


const Breadcrumbs = ({id}) => {
  const location = useLocation();

  const breadcrumbs = generateBreadcrumbs(location.pathname, id);

  return (
    <BreadcrumbsContainer className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        <Crumb key={breadcrumb.path}>
          <StyledLink to={breadcrumb.path} active={index===breadcrumbs.length-1}>{breadcrumb.name}</StyledLink>
          {index < breadcrumbs.length - 1 && <ArrowRightIcon />}
        </Crumb>
      ))}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;
