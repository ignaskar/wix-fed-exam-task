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

    const filteredData = tempData.filter(ticket =>
        (ticket.content.toLowerCase() || ticket.title.toLowerCase()).includes(search.toLowerCase()));

    const paginatedData = filteredData.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );

    res.send(new Pagination<TicketDto>(page, PAGE_SIZE, tempData.length, paginatedData));
});

app.listen(PORT);
console.log('server running', PORT);
