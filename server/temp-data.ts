import {Ticket} from '@ans-exam/client/src/api';
import {Employee} from '@ans-exam/client/src/api';

import * as fs from 'fs';
import Chance from 'chance';

const data = require('./data.json');
const employeeData = require('./employee_data.json');

export const tempData = data as Ticket[];
export const tempEmployeeData = employeeData as Employee[];
