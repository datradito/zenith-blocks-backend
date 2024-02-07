// Pagination.js
import React from "react";
import Button from "../../atoms/Button/Button";
import Styled from "styled-components";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const PaginationContainer = Styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const PageButton = Styled(Button)`
  width: auto;
  font-size: 0.65rem;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;

  &:hover {
    background-color: #1b1d32;
  }

  &.active {
    background-color: #1A65C0;
  }

  &:disabled {
    background-color: transparent;
    color: #717274;
    cursor: not-allowed;
  }
`;

const PrevNextButton = Styled(PageButton)`
  padding: 0.5rem;
`;

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <PaginationContainer>
      {/* Previous Page Button */}
      <PrevNextButton
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <KeyboardArrowRightIcon
          style={{
            transform: "rotate(180deg)",
            width: "1rem",
            padding: "0",
          }}
        />
      </PrevNextButton>

      {/* Page Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PageButton
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </PageButton>
      ))}

      {/* Next Page Button */}
      <PrevNextButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <KeyboardArrowRightIcon style={{ width: "1rem" }} />
      </PrevNextButton>
    </PaginationContainer>
  );
}

export default Pagination;
