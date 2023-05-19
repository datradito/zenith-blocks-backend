import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    buttonStyle: {
        backgroundColor: "#035FFC",
        margin: "2rem",
    },
    label:{
        color: 'Grey',
        fontSize: '.65rem'
    },
    subItemStyle: {
        minWidth: 200,
    },
    minWidth: {
        minWidth: '200px',
        maxWidth: '200px',
    },
    defaultWidth: {
        minWidth: '700px'
    }
}));

export default useStyles;