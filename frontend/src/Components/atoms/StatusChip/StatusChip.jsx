import * as React from 'react';
import Chip from '@mui/material/Chip';


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
  status = status.toUpperCase();
  if (!isValidStatus(status)) {
    return <Chip
      label={status || "UNPAID"}
      style={{
        backgroundColor: StatusTypes[status] || "red",
        color: "white"
      }}
    />;
  }

return (
  <Chip 
    label={status}
    style={{
      backgroundColor: StatusTypes[status.toUpperCase().replace(/\s+/g, "_")], 
      color: "white"
    }}
    />
  );
};

export default StatusChip;

