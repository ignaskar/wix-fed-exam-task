import React, {SetStateAction, useState} from 'react';
import {Employee, Ticket} from '../api';
import LabelList from './LabelList';
import Truncate from 'react-truncate';
import Assignment from "./Assignment";

interface ITicketProps {
    ticket: Ticket;
    employees: Employee[];
    idsToHide: string[];
    setIdsToHide: React.Dispatch<SetStateAction<string[]>>;
}

const TicketListItem = ({ ticket, employees, idsToHide, setIdsToHide}: ITicketProps) => {

    const [truncated, setTruncated] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleTruncate = (isTruncated: boolean) => {
        if (truncated !== isTruncated) {
            setTruncated(true);
        }
    };

    const toggleLines = (e: any) => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    const hideTicket = (ticket: Ticket) => {
        setIdsToHide([...idsToHide, ticket.id]);
    };

    return (
        <li className="ticket">
            <button className="btn btn-hide" onClick={() => hideTicket(ticket)}>hide</button>
            <h5 className="title">{ticket.title}</h5>
            <p className="ticket-content">
                <Truncate
                    lines={!expanded && 3}
                    ellipsis={(
                        <span>
                            <button className="btn-show-more"
                                    onClick={(e) => toggleLines(e)}>Show More</button>
                        </span>
                    )}
                    onTruncate={() => handleTruncate(false)}
                >
                    {ticket.content}
                </Truncate>
                {!truncated && expanded && (
                    <span>
                        <button className="btn-show-more" onClick={(e) => toggleLines(e)}>Show Less</button>
                    </span>
                )}
            </p>
            <footer>
                <div
                    className="meta-data">By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}
                </div>
                {ticket.labels ? <LabelList labels={ticket.labels} /> : null}

                <Assignment ticket={ticket} employees={employees} />
            </footer>
        </li>
    );
};

export default TicketListItem;