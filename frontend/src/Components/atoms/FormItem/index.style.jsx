import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    boxStyle:{
        display: "flex",
        flexDirection: "column",
        margin: "0rem auto",
        textAlign: 'left',
        borderBottom: '.05rem #2C2C2C solid',
    },
    FormLabel: {
        color: '#A2A4A5',
        padding: '.5rem 0',
    },
    containerStyles: {
        padding: '2rem ',
    },
}));

export default useStyles;