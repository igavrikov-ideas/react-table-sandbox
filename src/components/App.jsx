import React from 'react';
import { AutoSizer } from 'react-virtualized';
import axios from 'axios';
import DataTable from './DataTable';
import Badge from './Badge';
import ProgressBar from './ProgressBar';

const ENTITY_CLASS = 'Affair';

const locale = {
  en: {
    id: 'ID',
    name: 'Name',
    startDate: 'Start date',
    endDate: 'End date',
    budget: 'Budget',
    contractNo: 'Contract no',
    contractDate: 'Contract date',
    customer: 'Customer',
    code: 'Code',
    manager: 'Manager',
    fixedPrice: 'Fixed price',
    businessSector: 'Business sector',
    areas: 'Case area',
    notes: 'Notes',
    contact: 'Contact',
    counterpartyRegNo: 'Counterparty reg no',
    counterpartyName: 'Counterparty name',
    active: 'Active'
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

const columns = [
  'id',
  'name', 'startDate', 'endDate',
  'budget', 'contractNo', 'contractDate',
  'customer', 'code', 'manager',
  'fixedPrice', 'businessSector', 'areas',
  'notes', 'contact', 'counterpartyRegNo',
  'counterpartyName', 'active'
];

class App extends React.Component {
  state = {
    locale: 'en',
    ids: null
  };

  columnDecorator = (field) => {
    const priceCellRenderer = ({ cellData }) => cellData === null ? '' : <CurrencyFormat value={cellData/100} locale={this.state.locale} />;
    const dateCellRenderer = ({ cellData }) => cellData === null ? '' : <DateFormat value={cellData} locale={this.state.locale} />;
    switch (field) {
      case 'startDate':
      case 'endDate':
      case 'contractDate':
        return { cellRenderer: dateCellRenderer };
      case 'budget':
        return { weight: 2.5, cellRenderer: ({ cellData }) => cellData === null ? '' : <div>
          <CurrencyFormat value={cellData/100} locale={this.state.locale} />&nbsp;<ProgressBar maxValue={cellData} value={60000} />&nbsp;<span>{Math.floor(60000/100000*100)}%</span></div> };
      case 'fixedPrice':
        return { cellRenderer: priceCellRenderer };
      case 'active':
        return { weight: 1.2, cellRenderer: ({ cellData }) => cellData ? <Badge className="badge-primary">Aktiivne</Badge> : '' };
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
      const data = (await axios.get('api/search', {
        params: {
          entity: ENTITY_CLASS
        }
      })).data.map(el => el[1]);
      this.setState({ ids: data });
      return data;
    } else {
      return this.state.ids;
    }
  }

  rowLoader = async (startIndex, stopIndex, filteredIds) => {
    const ids = !filteredIds ? await this.getIds() : filteredIds;
    return axios.get('api/data', {
      params: {
        entity: ENTITY_CLASS,
        ids: ids.slice(startIndex, stopIndex + 1).join(),
        associations: 'customer,account,manager,contact'
      }
    }).then((res) => res.data);
  }

  rowContentRenderer = (dataKey, data) => {
    switch (dataKey) {
      case 'customer':
      case 'manager':
      case 'contact':
        return data === null ? data : data.name;
      default:
        return data;
    }
  }

  groupUpdate = (e) => {
    this.setState({ group: e.target.value === '' ? undefined : e.target.value.split(',') });
  }

  filterUpdate = (e) => {
    const customerName = e.target.value;
    this.setState({ filter: customerName === '' ? undefined : (obj) => obj.customer.name && obj.customer.name.indexOf(customerName) !== -1 });
  }

  render() {
    return <div>
      <div className="nav">
        <a className="nav__brand">Logo</a>
        <a className="nav__locale btn btn-success" onClick={this.switchLocale}>{`${this.state.locale}`}</a>
      </div>

      <br />

      <div id="content">
        <select onChange={this.groupUpdate}>
          <option value=""></option>
          <option value="customer.name">Client</option>
          <option value="name">Name</option>
          <option value="businessSector.0">Business sector</option>
          <option value="name,customer.name">Name / Client</option>
          <option value="code">Code</option>
        </select>
        <input type="text" onChange={this.filterUpdate} />

        <div className="container">
          <div><h1>Arved</h1></div>
        </div>

        <div className="container">
          <AutoSizer disableHeight>
            {({ width }) => <DataTable
              ids={this.state.ids}
              id={'CasesList'}
              group={this.state.group}
              filter={this.state.filter}
              columns={columns}
              defaultColumns={columns.filter(c => c !== 'id')}
              rowLoader={this.rowLoader}
              columnNamer={this.translate}
              columnDecorator={this.columnDecorator}
              rowContentRenderer={this.rowContentRenderer}
              width={width} />}
          </AutoSizer>
        </div>
      </div>
    </div>;
  }
}

export default App;