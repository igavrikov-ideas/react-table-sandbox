import React from 'react';
import { AutoSizer, InfiniteLoader, Table, Column, SortDirection } from 'react-virtualized';
import Icon from './Icon';

function SortIndicator({ sortDirection }) {
  const className = 'datatable__sortableIcon';
  const directionClass = sortDirection === SortDirection.ASC ? `${className}--ASC` : `${className}--DESC`;

  return (
    <svg className={`datatable__sortableIcon ${directionClass}`} width={18} height={18} viewBox="0 0 24 24">
      {sortDirection === SortDirection.ASC ? (
        <path d="M7 14l5-5 5 5z" />
      ) : (
          <path d="M7 10l5 5 5-5z" />
        )}
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    const columnDisplay = {};
    props.columns.forEach((col) => {
      columnDisplay[col] = props.defaultColumns !== undefined ? props.defaultColumns.includes(col) : true;
    });
    this.state = {
      sortBy: null,
      sortDirection: null,
      data: [],
      sortedData: [],
      loaded: false,
      columnDisplay,
      displayingFields: false
    };
  }

  noRowsRenderer = () => <div className="datatable__empty">No data</div>;

  getColumnName(dataKey) {
    if (this.props.columnNamer !== undefined) {
      const name = this.props.columnNamer(dataKey);
      if (name !== undefined) {
        return name;
      }
    }
    return dataKey;
  }

  getColumnProps(dataKey) {
    let props = {};
    if (this.props.columnDecorator !== undefined) {
      props = this.props.columnDecorator(dataKey);
    }
    if (props.disableSort !== true) {
      props.headerClassName = 'datatable__cell--sortable';
    }
    const cellRenderer = props.cellRenderer;
    props.cellRenderer = (obj) =>
      <div className="datatable__cell__contents">
        {cellRenderer !== undefined ? cellRenderer(obj) : (obj.cellData === null ? '' : String(obj.cellData))}
      </div>;
    return props;
  }

  headerRenderer = ({ dataKey, sortBy, sortDirection }) =>
    <div className="datatable__cell__contents">{this.getColumnName(dataKey)}{sortBy == dataKey && <SortIndicator sortDirection={sortDirection} />}</div>;

  toggleColumnDetails = () => {
    this.setState({ displayingFields: !this.state.displayingFields });
  }

  propertiesRenderer = () => {
    return <div className="fields">
      <a className="fields__toggle" href="#" onClick={this.toggleColumnDetails}><Icon style={{ width: 15 }} icon="details" /></a>
      <div className={`fields__dropdown ${this.state.displayingFields ? 'fields__dropdown--visible' : ''}`}>
        {Object.entries(this.state.columnDisplay).map((entry, idx) => {
          return <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor={entry[0]} style={{ flex: 1 }}>{this.getColumnName(entry[0])}</label>
            <input type="checkbox" name={entry[0]} checked={entry[1]} onChange={this.reloadColumns} />
          </div>;
        })}
      </div>
    </div>;
  }

  sort = ({ sortBy, sortDirection }) => {
    setTimeout(() => {
      if (sortBy != null) {
        const mult = sortDirection == SortDirection.ASC ? 1 : -1;
        const sortedData = this.state.data.slice().sort((a, b) => a[sortBy] < b[sortBy] ? -mult : a[sortBy] > b[sortBy] ? mult : 0);
        this.setState({ sortBy, sortDirection, sortedData });
      }
    }, 500); // simulate requesting sorting from API
  }

  rowGetter = ({ index }) => {
    return this.state.sortedData[index] || { loading: true };
  };

  rowRenderer = ({ className, key, columns, rowData, style }) => {
    if (rowData.loading) {
      return <div className={`${className} ${className}--loading`} key={key} role="row" style={style}>
        <span>Loading...</span>
      </div>;
    } else {
      return <div className={`${className} ${className}--data`} key={key} role="row" style={style}>
        {columns}
      </div>;
    }
  }

  isRowLoaded = ({ index }) => {
    return !!this.state.sortedData[index];
  }

  switchLocale = () => {
    this.setState({ locale: this.state.locale == 'en' ? 'et' : 'en' });
  }

  reloadColumns = (e) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.columnDisplay[e.target.name] = !this.state.columnDisplay[e.target.name];
    this.forceUpdate();
  }

  rowCount = () => {
    return this.state.data.length === 0 && this.state.loaded === true ? 0 : this.state.sortedData.length + 1;
  }

  loadMoreRows = ({ startIndex }) => new Promise((resolve, reject) => {
    this.props.rowLoader(startIndex, startIndex + 19).then((data) => {
      this.setState({ data: this.state.data.concat(data), sortedData: this.state.sortedData.concat(data) });
      this.forceUpdate();
      resolve();
    }).catch((e) => reject(e));
  });

  render() {
    const {
      sortBy,
      sortDirection
    } = this.state;

    const columnArray = Object.entries(this.state.columnDisplay).filter(c => c[1] === true).map(c => c[0]);
    const width = this.props.width || 960;

    return <InfiniteLoader
      ref={(el) => this.loader = el}
      isRowLoaded={this.isRowLoaded}
      loadMoreRows={this.loadMoreRows}
      rowCount={this.rowCount()}
      threshold={1} >
      {({ onRowsRendered, registerChild }) =>
        <Table
          className="datatable"
          onRowsRendered={onRowsRendered}
          headerHeight={60}
          disableHeader={false}
          ref={registerChild}
          sortBy={sortBy}
          sortDirection={sortDirection}
          noRowsRenderer={this.noRowsRenderer}
          rowGetter={this.rowGetter}
          rowRenderer={this.rowRenderer}
          rowClassName="datatable__row"
          headerClassName="datatable__cell datatable__cell--header"
          gridClassName="datatable__grid"
          sort={this.sort}
          height={500}
          rowHeight={60}
          rowCount={this.rowCount()}
          width={width}
          style={{ width }} >
          {columnArray.map((el, idx) => <Column
            key={idx}
            dataKey={el}
            width={Math.floor((width - 40) / (columnArray.length - 1))}
            headerRenderer={this.headerRenderer}
            className="datatable__cell"
            {...this.getColumnProps(el)}
          />)}
          <Column
            dataKey="edit"
            width={40}
            disableSort
            headerClassName="datatable__row--edit"
            className="datatable__row--edit"
            flexGrow={0}
            flexShrink={1}
            headerRenderer={this.propertiesRenderer}
            cellRenderer={() => <div><a href="#"><Icon style={{ width: 15 }} icon="edit" /></a>&nbsp;<a href="#"><Icon style={{ width: 15 }} icon="delete" /></a></div>} />
        </Table>}
    </InfiniteLoader>;
  }
}

export default DataTable;