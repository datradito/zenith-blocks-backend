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


// http://localhost:3000/proposals/0x974e9568499aaf7b508e9b735192083225040d1ecb679c383e4cd3d6c1f48b2a
const pages = [
  { name: "Proposals", path: "/proposals" },
  {
    name: "Budgets",
    path: /\/proposals\/([a-zA-Z0-9]+)\/budgets/i,

    //http://localhost:3000/proposals/0x576e698cd8649dd6a6a2456f06c4648bb0d95e35da000c51c82f243774b7ef9f/budgets
  },
  {
    name: "Create Budget",
    path: /\/budgets\/([a-zA-Z0-9]+)\/create/i,
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
  {
    name: "Pay Invoice",
    path: /\/invoice\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}\/payment/i,
  },
];


const generateBreadcrumbs = (pathname, id, secondaryId) => {

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

  if (pages[8].path.test(pathname) && secondaryId) {
    crumbs.push(
      { path: "/proposals", name: "Proposals" },
      //proposal id
      { path: `/proposals/${id}/budgets`, name: "Budgets" },
      //budget id
      { path: `/budgets/${secondaryId}/invoices`, name: "Invoices" },
      { path: pathname, name: "Pay Invoice" }
    );
  }

  return crumbs;
};


const Breadcrumbs = ({id, secondaryId = null}) => {
  const location = useLocation();

  const breadcrumbs = generateBreadcrumbs(location.pathname, id, secondaryId);

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
