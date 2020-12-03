import axios from 'axios';

export type Ticket = {
    id: string;
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
    assignee?: string;
};

export type Employee = {
    id: string,
    firstName: string,
    lastName: string,
    email: string;
}

interface IGetResponse<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number
    paginatedData: Array<T>;
}

interface IGetTicketsParameters {
    page: number;
    search: string;
}

export type ApiClient = {
    getTickets: (params: IGetTicketsParameters) => Promise<IGetResponse<Ticket>>;
    getEmployees: () => Promise<IGetResponse<Employee>>;
};

export const createApiClient = (): ApiClient => {
    return {
        getTickets: (params) => {
            return axios
                .get(`http://localhost:3232/api/tickets`, { params: params })
                .then((res) => res.data);
        },

        getEmployees: () => {
            return axios
                .get(`http://localhost:3232/api/employees`)
                .then(res => res.data);
        }
    };
};
