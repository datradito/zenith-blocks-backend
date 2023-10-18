
import CircularProgress from "@mui/material/CircularProgress";

const Loader = (props) => {
    return <CircularProgress 
        sx={{
            ...props?.sx
        }}
    />
}
    
export default Loader;