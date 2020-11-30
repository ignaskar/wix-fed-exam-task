import React from 'react';
import {Ticket} from "../api";
import LabelList from "./LabelList";

interface ITicketProps {
    ticket: Ticket;
}

const TicketListItem = ({ticket}: ITicketProps) => {
    return (
        <li className="ticket">
            <button className="btn btn-hide">hide</button>
            <h5 className='title'>{ticket.title}</h5>
            <p className="ticket-content">{ticket.content}</p>
            <footer>
                <div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
                {ticket.labels ? <LabelList labels={ticket.labels} /> : null}
            </footer>
        </li>
    )
}

export default TicketListItem;