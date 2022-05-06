import React from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { useState } from "react";
export default function PaginationComponent({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage = 20,
}) {
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const [input, setInput] = useState(currentPage);
  return (
    <Pagination className="justify-content-center">
      <Pagination.First
        onClick={() => {
          setCurrentPage(1);
        }}
      />
      <Pagination.Prev
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      />
      <Row className="align-items-center gx-0 p-1">
        <Col>
          <form>
            <input
              style={{
                height: "auto",
                width: "4rem",
                textAlign: "center",
                padding: "0.125rem 0.25rem",
                border: "none",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="number"
              min="1"
              max={lastPage}
              placeholder="1"
            ></input>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(input);
              }}
              style={{ display: "none" }}
            ></button>
          </form>
        </Col>
        <Col>/{lastPage}</Col>
      </Row>

      <Pagination.Next
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      />
      <Pagination.Last
        onClick={() => {
          setCurrentPage(lastPage);
        }}
      />
    </Pagination>
  );
}
