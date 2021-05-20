import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import "./pagination.css"

const Pagination = ({page,pages,changePage})=>{

    let middlePagination = [...Array(pages)].map((_,index)=>(
        <button onClick={()=>changePage(`${index+1}`)} disabled={index+1 == page} className="pagination_button">
            {index+1}
        </button>
    ))
    
    return (
        <div>
            <button onClick={()=>changePage("minus")} disabled={page === 1} className="pagination_button">&#171;</button>
            {middlePagination}
            <button onClick={()=>changePage("plus")} disabled={page === pages} className="pagination_button">&#187;</button>
        </div>
    )
}

export default Pagination;