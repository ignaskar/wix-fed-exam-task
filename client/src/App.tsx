import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import TicketList from './components/TicketList';
import './App.scss';
import {createApiClient, Employee, Ticket} from './api';
import Pagination from './components/Pagination';

const api = createApiClient();

const App = () => {
    const [search, setSearch] = useState<string>('');
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [idsToHide, setIdsToHide] = useState<string[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [totalTicketCount, setTotalTicketCount] = useState<number>(0);

    useEffect(() => {
        const fetchTicketsAsync = async () => {
            await api.getTickets({page: pageIndex, search: search}).then((res) => {
                setTickets(res.paginatedData);
                setTotalTicketCount(res.totalCount);
                setPageSize(res.pageSize);
            });
        };

        const fetchEmployeesAsync = async () => {
            await api.getEmployees().then(res => {
                setEmployees(res.paginatedData);
            })
        }

        fetchTicketsAsync();
        fetchEmployeesAsync();
    }, [search, pageIndex]);

    return (
        <main>
            <h1>Tickets List</h1>

            <Search setSearch={setSearch} setPageIndex={setPageIndex}/>
            <Pagination tickets={tickets}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        totalTicketCount={totalTicketCount}/>
            <TicketList
                tickets={tickets}
                totalTicketCount={totalTicketCount}
                employees={employees}
                search={search}
                idsToHide={idsToHide}
                setIdsToHide={setIdsToHide} />
            <Pagination tickets={tickets}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        totalTicketCount={totalTicketCount}/>
        </main>
    );
};

export default App;
