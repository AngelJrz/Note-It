import React from 'react';
import ReactPaginate from "react-paginate";

export default function Paginacion() {
    return (
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={2}
      />
    );
}
