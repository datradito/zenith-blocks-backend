import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    tableHeaderCell: {
        padding: "0 rem",
        border: ".05rem #272A30 solid",// Set default font size for table header cells
    },
    tableDataCell: {
        fontSize: '0.65rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        color: "gray",
        borderBottom: ".05rem #272A30 solid",
    },
}));

export default useStyles;