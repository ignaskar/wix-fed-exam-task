import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import TicketList from './components/TicketList';
import './App.scss';
import { createApiClient, Ticket } from './api';
import Pagination from './components/Pagination';

const api = createApiClient();

const App = () => {
    const [search, setSearch] = useState<string>('');
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [idsToHide, setIdsToHide] = useState<string[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [totalTicketCount, setTotalTicketCount] = useState<number>(0);

    useEffect(() => {
        const fetchTicketsAsync = async () => {
            await api.getTickets({ page: pageIndex, search: search }).then((res) => {
                setTickets(res.paginatedData);
                setTotalTicketCount(res.count);
                setPageSize(res.pageSize);
            });
        };

        fetchTicketsAsync();
    }, [search, pageIndex]);

    return (
        <main>
            <h1>Tickets List</h1>

            <Search setSearch={setSearch} />
            <Pagination tickets={tickets}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        totalTicketCount={totalTicketCount} />
            <TicketList
                tickets={tickets}
                totalTicketCount={totalTicketCount}
                search={search}
                idsToHide={idsToHide}
                setIdsToHide={setIdsToHide}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex} />
            <Pagination tickets={tickets}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        totalTicketCount={totalTicketCount} />
        </main>
    );
};

export default App;
