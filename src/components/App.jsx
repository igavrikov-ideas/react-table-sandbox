import React from 'react';
import DataTable from './DataTable';
import { AutoSizer } from 'react-virtualized';
import axios from 'axios';

const locale = {
  en: {
    number: 'Invoice no',
    type: 'Invoice type',
    status: 'Status',
    recipient: 'Recipient',
    case: 'Case',
    client: 'Client',
    issueDate: 'Issue date',
    dueDate: 'Due date',
    amountToPay: 'Grand total without VAT (€)'
  },
  et: {
    number: 'Arve nr',
    type: 'Arve tüüp',
    status: 'Staatus',
    recipient: 'Saaja',
    case: 'Asi',
    client: 'Klient',
    issueDate: 'Arve kuupäev',
    dueDate: 'Maksetähtaeg',
    amountToPay: 'Summa (€)'
  }
};

const CurrencyFormat = (props) => (
  <span>{Intl.NumberFormat(props.locale, {style: 'currency', currency: 'EUR'}).format(props.value)}</span>
);
const DateFormat = (props) => (
  <span>{Intl.DateTimeFormat(props.locale).format(new Date(props.value))}</span>
);

const columns = ['number', 'type', 'status', 'recipient', 'case', 'client', 'issueDate', 'dueDate', 'amountToPay'];

class App extends React.Component {
  state = {
    locale: 'en',
    ids: null
  };

  columnDecorator = (field) => {
    switch (field) {
      case 'issueDate':
      case 'dueDate':
        return { cellRenderer: ({ cellData }) => <DateFormat value={cellData} locale={this.state.locale} /> };
      case 'amountToPay':
        return { cellRenderer: ({ cellData }) => <CurrencyFormat value={cellData} locale={this.state.locale} /> };
      default:
        return {};
    }
  }

  translate = (key) => {
    return locale[this.state.locale][key];
  }

  switchLocale = () => {
    this.setState({ locale: this.state.locale == 'en' ? 'et' : 'en' });
  }

  getIds = async () => {
    if (this.state.ids === null) {
      const data = (await axios.get('/api/invoices')).data;
      this.setState({ ids: data });
      return data;
    } else {
      return this.state.ids;
    }
  }

  rowLoader = async (startIndex, stopIndex) => {
    const ids = await this.getIds();
    console.log('lets send', startIndex, stopIndex, ids);
    return axios.post('/api/invoices/details', {
      data: ids.slice(startIndex, stopIndex)
    }).then((res) => res.data);
  }

  render() {
    return <div>
      <div className="nav">
        <a className="nav__brand">Logo</a>
        <a className="nav__locale btn btn-success" onClick={this.switchLocale}>{`${this.state.locale}`}</a>
      </div>

      <br />

      <div id="content">
        <div className="container">
          <div><h1>Arved</h1></div>
        </div>

        <div className="container">
          <AutoSizer disableHeight>
            {({ width }) => <DataTable
              ids={this.state.ids}
              columns={columns}
              rowLoader={this.rowLoader}
              columnNamer={this.translate}
              columnDecorator={this.columnDecorator}
              width={width} />}
          </AutoSizer>
        </div>
      </div>
    </div>;
  }
}

export default App;