import React from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent({ currentPage, setCurrentPage, totalItems, itemsPerPage = 20 }) {
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick = {()=> {setCurrentPage(1)}}/>
      <Pagination.Prev onClick = {()=> {setCurrentPage(currentPage - 1)}}/>
      <Pagination.Item active>{currentPage}</Pagination.Item>

      <Pagination.Next onClick = {()=> {setCurrentPage(currentPage + 1)}}/>
      <Pagination.Last onClick = {()=> {setCurrentPage(lastPage)}}/>
    </Pagination>
  );
}
