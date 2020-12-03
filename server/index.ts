import express from 'express';
import fs from 'fs';
import bodyParser = require('body-parser');
import {tempData} from './temp-data';
import {tempEmployeeData} from './temp-data';
import Pagination from './Helpers/pagination';
import {TicketDto} from './Dtos/TicketDto';
import {EmployeeDto} from './Dtos/EmployeeDto';

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

    const re = /((after:)|(before:))((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4})|(from:\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)|(label:)/g;

    const searchPattern = search.match(re);
    if (searchPattern) {
        searchPattern.forEach((str: string) => {

            const searchParts = str.split(':');
            const dateParts = searchParts[1].split('/')
            const correctDateToParse = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;

            switch (searchParts[0]) {
                case 'after':
                    filteredData = filteredData.filter(ticket => +new Date(ticket.creationTime) > Date.parse(correctDateToParse));
                    filteredData = filteredData.filter(ticket =>
                        (ticket.content.toLowerCase() + ticket.title.toLowerCase()).includes(search.substr(searchPattern[0].length + 1, search.length).toLowerCase()));
                    break;
                case 'before':
                    filteredData = filteredData.filter(ticket => +new Date(ticket.creationTime) < Date.parse(correctDateToParse));
                    filteredData = filteredData.filter(ticket =>
                        (ticket.content.toLowerCase() + ticket.title.toLowerCase()).includes(search.substr(searchPattern[0].length + 1, search.length).toLowerCase()));
                    break;
                case 'label':
                    filteredData = filteredData.filter(ticket => ticket.labels?.includes(search.substr(searchParts[0].length + 1, search.length)));
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

app.get('/api/employees', (req, res) => {

    const page = req.query.page || 1;

    const paginatedData = tempEmployeeData.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );

    res.send(new Pagination<EmployeeDto>(page, PAGE_SIZE, tempEmployeeData.length, paginatedData));
});

app.patch('/api/tickets/:id', (req, res) => {

    const id = req.params.id;
    const assigneeId = req.body.assigneeId;

    const verifyAssigneeId = (assigneeId: string): boolean => {
        const assignee = tempEmployeeData.find(emp => emp.id === assigneeId);
        return assignee !== undefined && typeof assigneeId === 'string';

    };

    const assignTicket = (assigneeId: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const ticketToUpdate = tempData.find(ticket => ticket.id === id);
            console.log(verifyAssigneeId(assigneeId))
            console.log(typeof assigneeId)
            console.log(assigneeId)

            if (ticketToUpdate !== undefined && verifyAssigneeId(assigneeId)) {
                ticketToUpdate.assignee = assigneeId;
                fs.writeFile('./data.json', JSON.stringify(tempData), 'utf8', () => {
                    resolve('file saved.');
                });
            } else {
                reject('Unable to update ticket.');
            }
        });
    };

    assignTicket(assigneeId)
        .then(() => {
            res.status(204).end();
        })
        .catch((err) => {
            console.log(`DB logging mock - ${err} - ${new Date().toUTCString()}`);
            res.status(400)
                .send({success: false, errors: err});
        });
});

app.listen(PORT);
console.log('server running', PORT);
