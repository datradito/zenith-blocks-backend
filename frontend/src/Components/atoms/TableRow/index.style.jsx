import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    tableRow: {
        // Set default font size for table header cells
        borderTop: ".05rem #272A30 solid",
        borderBottom: ".05rem #272A30 solid",
    },
    tableDataCellItem: {
        color: "white",
        padding: '0.5rem',
        border: 'inherit',
    }
}));

export default useStyles;