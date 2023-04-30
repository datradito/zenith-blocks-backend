import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        text: {
            primary: '#333',
            secondary: '#666',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 'bold',
        },
        h6: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.8rem',
        },
    },
});
