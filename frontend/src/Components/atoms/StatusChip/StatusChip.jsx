import * as React from 'react';
import Chip from '@mui/material/Chip';
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";


const statusIcons = [
  { component: <PendingIcon fontSize="small" />, status: "PENDING" },
  {
    component: <CheckCircleIcon fontSize="small" color="success" />,
    status: "SUCCESS",
  },
  {
    component: <ErrorIcon fontSize="small" color="#f44336" />,
    status: "FAILED",
  },
];


export const StatusTypes = {
  PAID: "#008000", // green
  UNPAID: "#FF0000", // red
  CLOSED: "#008000", // green
  SUCCESS: "#008000", // green
  SIGNED: "#008000", // green
  FAILED: "#FF0000", // failedRed
  PENDING: "#B8860B", // pendingYellow
  PROCESSING: "#0000FF", // processingBlue
  CANCELLED: "#FF0000", // cancelledRed
  COMPLETED: "#008000", // completedGreen
  IN_PROGRESS: "#0000FF", // inProgressBlue
  IN_REVIEW: "#FFFF00", // inReviewYellow
  APPROVED: "#008000", // success
  REJECTED: "#FF0000", // rejectedRed
  PENDING_APPROVAL: "#FFFF00", // pendingApprovalYellow
  NEW: "#FF0000", // red
};

const isValidStatus = (status) => Object.values(StatusTypes).includes(status);
const StatusChip = ({ status, type }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  status = status.toUpperCase();
  if (!isValidStatus(status)) {
    // If type is 'payment', return the corresponding icon
    if (type === "payment") {
      const statusIcon = statusIcons.find((icon) => icon.status === status);
      return statusIcon ? statusIcon.component : null;
    }

    // If no type is specified, return the default status chip
    return (
      <Chip
        label={isSmallScreen ? "" : status || "NEW"}
        style={{
          backgroundColor: StatusTypes[status] || "red",
        }}
      />
    );
  }
};
export default StatusChip;

