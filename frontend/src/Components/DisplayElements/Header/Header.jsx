import * as React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';

import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
} from '@mui/material';

import logo from "../../../Images/logo.png"


const pages = ['proposals', 'invoices', 'accounts'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const navLinkStyle = {
    textDecoration: "none",
    color: "white"
}


const ResponsiveHeaderBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // const handlePageClick = (page) => {
    //     const navigate = useNavigate();
    //     navigate(`/${page}`);
    //     handleCloseNavMenu();
    // };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleConnectToWallet = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                        <img style={{ maxWidth: "2rem" }} src={logo} alt="Logo" />
                        
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" textDecoration="none">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button>
                                <NavLink
                                    style={navLinkStyle}
                                    to={page}
                                    key={page}
                                    // onClick={handlePageClick}
                                    sx={{  color: 'white', textTransform: 'capitalize', display: 'block' }}
                                    >
                                    {page}
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