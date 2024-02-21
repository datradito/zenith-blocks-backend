import EditIcon from "@mui/icons-material/Edit";

function CustomActionIcon({ onClick }) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <EditIcon
      spacing={2}
      color="primary"
      variant="contained"
      onClick={handleClick}
    />
  );
}

export default CustomActionIcon;
