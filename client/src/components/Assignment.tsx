import React, {useState} from 'react';
import axios from "axios";
import {Employee, Ticket} from "../api";

interface IAssignmentProps {
    ticket: Ticket;
    employees: Employee[];
}

const Assignment = ({ticket, employees}: IAssignmentProps) => {

    const [selectedAssignee, setSelectedAssignee] = useState<string>("Assign To...");

    const handleAssigneeChange = (event: any, ticketId: string) => {
        ticket.assignee = event.target.value;
        setSelectedAssignee(event.target.value)
        return axios.patch(`http://localhost:3232/api/tickets/${ticketId}`, {assigneeId: event.target.value})

    }

    const findNameById = (id: string) => {
        const usr = employees.find(x => x.id === id);
        return usr !== undefined ? `${usr.firstName} ${usr.lastName}` : "unassigned";
    }

    const handleAssigneeRemoval = (ticket: Ticket) => {
        if (ticket.assignee !== undefined) {
            ticket.assignee = "Unassigned";
            setSelectedAssignee("Unassigned")
            return axios.patch(`http://localhost:3232/api/tickets/${ticket.id}`, {assigneeId: ticket.assignee})
        }
    }

    return (
        <div className="assignment-module">
            <p>assigned to: {ticket.assignee === undefined ? "Assign To..." : findNameById(ticket.assignee)}</p>
            <select value={selectedAssignee} onChange={(e) => handleAssigneeChange(e, ticket.id)}>
                {employees.map(e => (
                    <option key={e.id} value={e.id}>{`${e.firstName} ${e.lastName}`}</option>
                ))}
            </select>
            <button className="btn ripple" onClick={() => handleAssigneeRemoval(ticket)}>remove assignee</button>
        </div>
    )
}

export default Assignment;