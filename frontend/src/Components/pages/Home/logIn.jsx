import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../../Utility/Providers/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    if (user) {
        navigate('/proposals');
    }

    return (
        <Card sx={{
            display: 'flex',
            backgroundColor: '#303133', // Main color
            padding: '20px',
            justifyContent: 'center',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '50%',
            margin: '0 auto',
            marginTop: '10%',
        }}>
            <CardContent
            >
                <Typography sx={{ fontSize: 14, color: 'white' }} variant='subtitle2' gutterBottom>
                    Welcome to ZenithBlocks
                </Typography>
                <Typography variant="h5" component="div">

                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5, color: 'white', }} >
                    Please connect wallet to start
                </Typography>
                <Typography variant="body2">
    

                </Typography>
            </CardContent>
            <CardActions>
                {/* <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" /> */}
            </CardActions>
        </Card>
    );
}
