import React, {SetStateAction} from 'react';
import {Ticket} from "../api";
import TicketListItem from './TicketListItem'

interface ITicketListProps {
    tickets: Ticket[];
    search: string;
    idsToHide: string[];
    setIdsToHide: React.Dispatch<SetStateAction<string[]>>;
}

const TicketList = ({tickets, search, idsToHide, setIdsToHide}: ITicketListProps) => {

    const filteredTickets = tickets.filter(t => !idsToHide.includes(t.id))
    let statusMessage: JSX.Element;

    const onRestore = () => {
        setIdsToHide([]);
    }

    switch (idsToHide.length) {
        case 0:
            statusMessage = (<></>);
            break;
        case 1:
            statusMessage = (
                <div className="hidden-results">1 hidden ticket - <button onClick={() => onRestore()} className="btn btn-restore">restore</button></div>
            )
            break;
        default:
            statusMessage = (
                <div className="hidden-results">{idsToHide.length} hidden tickets - <button onClick={() => onRestore()} className="btn btn-restore">restore</button></div>
            )
            break;
    }

    return(
        <div>
            { tickets ? <div className='results'>Showing {tickets.length} results {statusMessage}</div> : null }
            <ul className="tickets">
                {filteredTickets.map(ticket => (
                    <TicketListItem key={ticket.id} ticket={ticket} idsToHide={idsToHide} setIdsToHide={setIdsToHide} />
                ))}
            </ul>
        </div>
    )
}

export default TicketList