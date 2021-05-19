import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ()=>{

    let middlePagination = [...Array(5)].map((_,index)=>(
        <button>
            {index+1}
        </button>
    ))
    
    return (
        <div>
            <button>&#171;</button>
            {middlePagination}            
            <button>&#187;</button>
        </div>
    )
}

export default Pagination;