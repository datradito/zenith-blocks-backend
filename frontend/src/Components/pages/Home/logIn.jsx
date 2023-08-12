import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UnstyledSelectBasic from '../../atoms/SelectDropdown/SelectDropdown';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { GET_SPACES } from '../../../SnapShot/Queries';
import { useQuery } from '@apollo/client';
import { snapShotClient } from '../../../SnapShot/client.js';
import CircularIndeterminate from '../../atoms/Loader/loader';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
//change background color of default them to be dark blue and black faint gradient


export default function LogIn() {

    const { loading, error, data } = useQuery(GET_SPACES, {
        client: snapShotClient,
    });

    const [spaces, setSpaces] = React.useState([]);

    React.useEffect(() => {
        if (data) {
            setSpaces(data.spaces);
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            daoId: data.get('daoId'),
        });
    };

    const onChange = (event) => {
        console.log(event.target.value);
    }

    if (loading) return <CircularIndeterminate />;
    if (error) return `Error! ${error.message}`;
    

    return (
        <Box sx={{
            background: '#2a2e2c', 
            height: '100vh',
        }}>
            <Grid container component="main" sx={{ width: "60%", margin: "0rem auto", borderRadius: "5px", paddingTop: "5rem" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Welcome to ZenithBlocks
                        </Typography>

                        <Typography component="h1" variant="subtitle1">
                            Select your DAO
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="daoId"
                                label="Dao ID"
                                name="daoId"
                                autoComplete="daoId"
                                autoFocus
                            /> */}

                            <UnstyledSelectBasic
                                
                                onChange={onChange}
                                defaultValue="Select your Dao from list"
                                values={spaces} />
                            {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            /> */}
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Connect
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
        </Grid>
        </Box>
    );
}