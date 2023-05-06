import { makeStyles } from '@mui/styles';
import { theme } from "../../../styles/theme.js";

const useStyles = makeStyles((theme) => ({
    buttonStyle: {
        backgroundColor: "#035FFC",
        margin: "2rem",
    },
    label:{
        color: 'Gray',
        fontSize: '.65rem'
    },
    subItemStyle: {
        minWidth: 200,
    },
    stack: {

    }
}));

export default useStyles;