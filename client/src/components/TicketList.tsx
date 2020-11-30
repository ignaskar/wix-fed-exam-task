import React from 'react';
import {Ticket} from "../api";
import TicketListItem from './TicketListItem'

interface ITicketListProps {
    tickets: Ticket[];
    search: string;
}

const TicketList = ({tickets, search}: ITicketListProps) => {

    const filteredTickets = tickets.filter(t =>
        (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase())
    )

    return(
        <ul className="tickets">
            {filteredTickets.map(ticket => (
                <TicketListItem key={ticket.id} ticket={ticket} />
            ))}
        </ul>
    )
}

export default TicketList