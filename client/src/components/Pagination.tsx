import React, { SetStateAction, useRef } from 'react';
import { Ticket } from '../api';
import { v4 as uuidv4 } from 'uuid';

interface IPaginationProps {
    tickets: Ticket[];
    totalTicketCount: number;
    pageIndex: number;
    setPageIndex: React.Dispatch<SetStateAction<number>>;
    pageSize: number;
    setPageSize: React.Dispatch<SetStateAction<number>>;
}

const Pagination = ({ tickets, totalTicketCount, pageIndex, setPageIndex, pageSize, setPageSize }: IPaginationProps) => {

    const totalPages = Math.ceil(totalTicketCount / pageSize);
    const pageArray = Array.from(Array(totalPages).keys());

    const handleNextPage = (pageIndex: number) => {

        if (tickets.length < pageSize) {
            setPageIndex(totalPages);
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    const handlePreviousPage = (pageIndex: number) => {
        if (pageIndex === 1) {
            return;
        } else {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleInputChange = (e: any) => {
        setPageIndex(parseInt(e.target.value));
    };


    return (
        <div>
            <div className="pagination">
                <button className="btn" onClick={() => handlePreviousPage(pageIndex)}>Previous Page</button>
                <div className="pagination-control">
                    <label>Page</label>
                   <select value={pageIndex} onChange={(e) => handleInputChange(e)}>
                        {pageArray.map(pn => (
                            <option key={uuidv4()}>{pn + 1}</option>
                        ))}
                    </select>
                </div>
                <button className="btn" onClick={() => handleNextPage(pageIndex)}>Next Page</button>
            </div>
        </div>

    );
};

export default Pagination;