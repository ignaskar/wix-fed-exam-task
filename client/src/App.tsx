import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import TicketList from './components/TicketList';
import './App.scss';
import { createApiClient, Ticket } from './api';

const api = createApiClient();

const App = () => {
    const [search, setSearch] = useState<string>('');
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [idsToHide, setIdsToHide] = useState<string[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        const fetchTicketsAsync = async () => {
            await api.getTickets({ page: pageNumber, search: search }).then((res) => {
                setTickets(res.data);
            });
        };

        fetchTicketsAsync();
    }, [search]);

    return (
        <main>
            <h1>Tickets List</h1>
            <Search setSearch={setSearch} />
            <TicketList
                tickets={tickets}
                search={search}
                idsToHide={idsToHide}
                setIdsToHide={setIdsToHide}
            />
        </main>
    );
};

export default App;
