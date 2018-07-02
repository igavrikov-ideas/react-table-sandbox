const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  winston = require('winston'),
  expressWinston = require('express-winston');

const app = express();

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ name: 'FILE_COMBINED', filename: 'log/combined.log' }),
    new winston.transports.File({ name: 'FILE_ERRORS', filename: 'log/error.log', level: 'error' }),
    new winston.transports.Console({ name: 'CONSOLE_OUTPUT', level: process.env.NODE_ENV === 'production' ? 'error' : 'info' })
  ],
  expressFormat: true,
  colorize: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* API definition */

const api = express.Router();

function buildMockData() {
  const statuses = ['CONFIRMED', 'DRAFT', 'OVERDUE', 'PROFORMA'];
  const types = ['type O', 'type A', 'type B', 'type AB'];
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const addDays = (days) => {
    const out = new Date();
    out.setDate(out.getDate() + days);
    return out;
  };
  const customer = 'Customer ' + (Math.floor(Math.random() * 10) + 1) + ' OÜ';
  return {
    number: Math.floor(Math.random() * 100000),
    type: getRandom(types),
    status: getRandom(statuses),
    recipient: customer,
    case: 'Case ' + (Math.floor(Math.random() * 10) + 1),
    client: customer,
    issueDate: addDays(-(Math.floor(Math.random() * 3) + 1)),
    dueDate: addDays((Math.floor(Math.random() * 3) + 1)),
    amountToPay: Math.random() * 1000 + 1
  };
}

let ids = [];
const details = [];
let lastId = -1;
for (let i = 0; i < 10000; i++) {
  ids[i] = lastId + Math.floor(Math.random() * 3) + 1;
  lastId = ids[i];
}
for (const id of ids) {
  details[id] = buildMockData();
}

api.get('/invoices', (req, res) => {
  setTimeout(() => res.send(ids), 500);
});
api.post('/invoices/details', (req, res) => {
  const data = req.body.data;
  const out = data.map((id) => details[id]);
  setTimeout(() => res.send(out), 500); // Simulate delay
});

/* End API */

app.use('/api', api);

app.use(express.static(path.join(__dirname, '/dist/')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
});
