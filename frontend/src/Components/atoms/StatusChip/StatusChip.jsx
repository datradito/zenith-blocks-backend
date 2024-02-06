import * as React from 'react';
import Chip from '@mui/material/Chip';
import useMediaQuery from "@mui/material/useMediaQuery";


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

const StatusChip = ({ status }) => {

    const isSmallScreen = useMediaQuery("(max-width: 600px)");

  status = status.toUpperCase();
  if (!isValidStatus(status)) {
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

return (
  <Chip
    label={isSmallScreen ? "" : status}
    size="small"
    style={{
      backgroundColor: StatusTypes[status.toUpperCase().replace(/\s+/g, "_")],
      color: "white",
    }}
  />
);
};

export default StatusChip;

