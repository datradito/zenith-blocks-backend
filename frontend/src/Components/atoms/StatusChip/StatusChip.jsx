import * as React from 'react';
import Chip from '@mui/material/Chip';
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";


const statusIcons = [
  { component: <PendingIcon fontSize="large" />, status: "PENDING" },
  {
    component: <CheckCircleIcon fontSize="large" color="success" />,
    status: "SUCCESS",
  },
  {
    component: <ErrorIcon fontSize="large" color="#f44336" />,
    status: "FAILED",
  },
];


export const StatusTypes = {
  PAID: "green",
  UNPAID: "red",
  CLOSED: "green",
  SUCCESS: "green",
  FAILED: "failedRed",
  PENDING: "pendingYellow",
  PROCESSING: "processingBlue",
  CANCELLED: "cancelledRed",
  COMPLETED: "completedGreen",
  IN_PROGRESS: "inProgressBlue",
  IN_REVIEW: "inReviewYellow",
  APPROVED: "success",
  REJECTED: "rejectedRed",
  PENDING_APPROVAL: "pendingApprovalYellow",
  NEW: "red",
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
          color: "white",
        }}
      />
    );
  }
};
export default StatusChip;

