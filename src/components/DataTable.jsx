import React from 'react';
import { InfiniteLoader, Table, Column, SortDirection } from 'react-virtualized';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
      columnOrder: Object.entries(columnDisplay).map(c => c[0]),
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
    let props = { weight: 1 };
    if (this.props.columnDecorator !== undefined) {
      props = Object.assign(props, this.props.columnDecorator(dataKey));
    }
    if (props.disableSort !== true) {
      props.headerClassName = 'datatable__cell--sortable';
    }
    const cellRenderer = props.cellRenderer;
    const contentRenderer = this.props.rowContentRenderer === null ? (a, b) => b : this.props.rowContentRenderer;
    props.cellRenderer = (obj) => {
      const contents = obj.cellData === undefined ? obj.cellData : contentRenderer(dataKey, obj.cellData);
      const newObj = Object.assign(Object.assign({}, obj), {cellData: contents});
      return <div className="datatable__cell__contents">
        {cellRenderer !== undefined ? cellRenderer(newObj) : (newObj.cellData === null ? '' : String(newObj.cellData))}
      </div>;
    };
    return props;
  }

  headerRenderer = ({ dataKey, sortBy, sortDirection }) =>
    <div className="datatable__cell__contents">{this.getColumnName(dataKey)}{sortBy == dataKey && <SortIndicator sortDirection={sortDirection} />}</div>;

  toggleColumnDetails = () => {
    this.setState({ displayingFields: !this.state.displayingFields });
  }

  reorderColumns = (startIndex, endIndex) => {
    const columnOrder = Array.from(this.state.columnOrder);
    const [removed] = columnOrder.splice(startIndex, 1);
    columnOrder.splice(endIndex, 0, removed);
    this.setState({ columnOrder });
  }

  onColumnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    this.reorderColumns(result.source.index, result.destination.index);
  }

  propertiesRenderer = () => {
    return <div className="fields">
      <a className="fields__toggle" href="#" onClick={this.toggleColumnDetails}><Icon style={{ width: 15 }} icon="details" /></a>
      <div className={`fields__dropdown ${this.state.displayingFields ? 'fields__dropdown--visible' : ''}`}>
        <DragDropContext onDragEnd={this.onColumnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => <div ref={provided.innerRef}>
              {this.state.columnOrder.map((entry, idx) => {
                return <Draggable key={idx} draggableId={idx} index={idx}>
                  {(provided, snapshot) => 
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ display: 'flex', alignItems: 'center', ...provided.draggableProps.style }}>
                      <div style={{ flex: 1 }}>{this.getColumnName(entry)}</div>
                      <input type="checkbox" name={entry} checked={this.state.columnDisplay[entry]} onChange={this.reloadColumns} />
                    </div>
                  }
                </Draggable>;
              })}
            </div>}
          </Droppable>
        </DragDropContext>
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
    return this.state.data.filter(d => d.id === this.props.ids[index]).length > 0;
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
    //return this.state.data.length === 0 && this.state.loaded === true ? 0 : this.state.sortedData.length + 1;
    return this.props.ids === null ? 1 : this.props.ids.length;
  }

  loadMoreRows = ({ startIndex, stopIndex }) => new Promise((resolve, reject) => {
    this.props.rowLoader(startIndex, stopIndex).then((data) => {
      const existingData = data.filter(ed => !this.state.data.map(d => d.id).includes(ed.id));
      this.setState({ data: this.state.data.concat(existingData), sortedData: this.state.sortedData.concat(existingData) });
      this.forceUpdate();
      resolve();
    }).catch((e) => reject(e));
  });

  render() {
    const {
      sortBy,
      sortDirection
    } = this.state;

    const columnArray = this.state.columnOrder.filter(c => this.state.columnDisplay[c]);
    const width = this.props.width || 960;
    const columnProps = columnArray.map(c => this.getColumnProps(c));
    const totalWeight = columnProps.reduce((acc, cur) => acc + cur.weight, 0);

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
            minWidth={Math.floor((width - 80) / totalWeight * columnProps[idx].weight)}
            width={0}
            headerRenderer={this.headerRenderer}
            className="datatable__cell"
            flexGrow={1}
            {...columnProps[idx]}
          />)}
          <Column
            dataKey="edit"
            width={40}
            disableSort
            headerClassName="datatable__row--edit"
            className="datatable__row--edit"
            headerRenderer={this.propertiesRenderer}
            cellRenderer={() => <div><a href="#"><Icon style={{ width: 15 }} icon="edit" /></a>&nbsp;<a href="#"><Icon style={{ width: 15 }} icon="delete" /></a></div>} />
        </Table>}
    </InfiniteLoader>;
  }
}

export default DataTable;