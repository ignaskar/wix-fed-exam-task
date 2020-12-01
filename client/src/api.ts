import axios from 'axios';

export type Ticket = {
    id: string;
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
};

interface IResponse {
    data: Ticket[];
}

interface IParameters {
    page: number;
    search: string;
}

export type ApiClient = {
    getTickets: (params: IParameters) => Promise<IResponse>;
};

export const createApiClient = (): ApiClient => {
    return {
        getTickets: (params) => {
            return axios
                .get(`http://localhost:3232/api/tickets`, { params: params })
                .then((res) => res);
        },
    };
};
