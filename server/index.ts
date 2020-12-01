import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import Pagination from './Helpers/pagination';
import { TicketDto } from './Dtos/TicketDto';

const app = express();
const PORT = 3232;
const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/api/tickets', (req, res) => {

    const page = req.query.page || 1;
    const search = req.query.search || '';
    let filteredData = tempData;

    const re = /(((after:)|(before:))(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00)))))|(from:\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)/g;

    const searchPattern = search.match(re);
    if (searchPattern) {
        searchPattern.forEach((str: string) => {
            const searchParts = str.split(':');

            switch (searchParts[0]) {
                case 'after':
                    filteredData = filteredData.filter(ticket => +new Date(ticket.creationTime) > Date.parse(searchParts[1]));
                    filteredData = filteredData.filter(ticket =>
                        (ticket.content.toLowerCase() + ticket.title.toLowerCase()).includes(search.substr(searchPattern[0].length + 1, search.length).toLowerCase()));
                    break;
                case 'before':
                    filteredData = filteredData.filter(ticket => +new Date(ticket.creationTime) < Date.parse(searchParts[1]));
                    filteredData = filteredData.filter(ticket =>
                        (ticket.content.toLowerCase() + ticket.title.toLowerCase()).includes(search.substr(searchPattern[0].length + 1, search.length).toLowerCase()));
                    break;
                default:
                    filteredData = filteredData.filter(ticket => ticket.userEmail.toLowerCase() === searchParts[1]);
                    break;
            }
        });
    } else {
        filteredData = filteredData.filter(ticket =>
            (ticket.content.toLowerCase() + ticket.title.toLowerCase()).includes(search.toLowerCase()));
    }

    const paginatedData = filteredData.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );

    res.send(new Pagination<TicketDto>(page, PAGE_SIZE, filteredData.length, paginatedData));
});

app.listen(PORT);
console.log('server running', PORT);
