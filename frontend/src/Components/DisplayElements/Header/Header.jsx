import * as React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { useSelector } from 'react-redux';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';

import logo from "../../../Images/logo.png"


// const pages = [
//     { name: 'Proposals', url: '/proposals' },
//     { name: 'Invoices', url: `/proposals/proposalId/invoices` },
//     { name: 'Accounts', url: '/accounts' },
    // Add more pages with their corresponding URLs and information
// ];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const navLinkStyle = {
    textDecoration: "none",
    color: "white"
}


const ResponsiveHeaderBar = () => {
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);

    let { proposal } = useSelector(state => state.currentProposal);
    let pages = [];

    proposal ? pages.push(
        { name: 'Proposals', url: '/proposals' },
        { name: 'Invoices', url: `/proposals/${proposal.id}/invoices` },
        { name: 'Accounts', url: '/accounts' },
        { name: 'Swap', url: '/swap' },
        { name: 'Dashboard', url: '/dashboard' }) : pages.push({ name: 'Proposals', url: '/proposals' },
        { name: 'Accounts', url: '/accounts' });



    // const handlePageClick = (page) => {
    //     const navigate = useNavigate();
    //     navigate(`/${page}`);
    //     handleCloseNavMenu();
    // };

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    // const handleConnectToWallet = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#1A1C1E',
                fontFamily: 'Fantasy',
                padding: '.5rem 2rem',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'White',
                            textDecoration: 'none',
                        }}
                    >
                        <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" />
                    </Typography>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button key={index}>
                                <NavLink
                                    style={navLinkStyle}
                                    to={page.url}
                                    key={page.name}
                                    // onClick={handlePageClick}
                                    sx={{  color: 'white', textTransform: 'capitalize', display: 'block' }}
                                    >
                                    {page.name}
                                </NavLink>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                           <WalletConnect /> 
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveHeaderBar;