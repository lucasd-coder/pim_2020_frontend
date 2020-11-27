import React from 'react';

import './style.css';

export default function Pagination(props) {
    const { totalPages = 0, goToPage, activePage } = props;

    const paginationItems = Array.from(Array(totalPages).keys());

    return (
        <div className="pagination-container">
            {paginationItems.map(item => (
                <button
                    key={item}
                    className={`pagination-item ${activePage === item ? 'active' : 'inactive'}`}
                    onClick={() => goToPage(item)}
                >
                    {item + 1}
                </button>
            ))}
        </div>
    )


}