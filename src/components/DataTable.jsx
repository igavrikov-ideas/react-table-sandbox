import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, Table, Column, SortDirection } from 'react-virtualized';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from './Icon';
import ClickOutside from './ClickOutside';
import Checkbox from './Checkbox';

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

function groupBy(list, fields) {
  return list.reduce((result, obj) => {
    // Find existing group, walking the tree for dot-separated paths
    const arr = result.filter(e => {
      let match = true;
      fields.some(f => {
        const tree = f.split('.');
        let a = obj;
        for (let i = 0; i < tree.length; i++) {
          a = a[tree[i]];
        }
        match = match && a === e[f];
        return match === false;
      });
      return match;
    });

    // Create new group if none found
    let group;
    if (arr.length === 0) {
      const newGroup = { _name: '', _entries: [] };
      const nameParts = [];
      fields.forEach(f => {
        const tree = f.split('.');
        let a = obj;
        for (let i = 0; i < tree.length; i++) {
          a = a[tree[i]];
        }
        newGroup[f] = a;
        nameParts.push(String(a));
      });
      newGroup._name = nameParts.join(' / ');
      result.push(newGroup);
      group = newGroup;
    } else {
      group = arr[0];
    }

    // Assign to group
    group._entries.push(obj);
    return result;
  }, []);
}

class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    const columnDisplay = {};
    props.columns.forEach((col) => {
      columnDisplay[col] = props.defaultColumns !== undefined ? props.defaultColumns.includes(col) : true;
    });
    let preferences = {
      columnDisplay,
      columnOrder: Object.entries(columnDisplay).map(c => c[0])
    };
    try {
      preferences = JSON.parse(localStorage.getItem(props.id) || 'null');
    } catch (e) {
      // squash
    }
    this.state = {
      sortBy: null,
      sortDirection: null,
      data: [],
      sortedData: [],
      loaded: false,
      displayingFields: false,
      preferences
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.group !== prevProps.group || this.props.filter !== prevProps.filter) {
      this.groupRows();
    }
  }

  groupRows = () => {
    if (this.props.group) {
      const data = this.props.filter === undefined ? this.state.sortedData : this.state.sortedData.filter(this.props.filter);
      this.setState({ groupedData: groupBy(data, this.props.group) });
    } else {
      this.setState({ groupedData: undefined });
    }
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

  setPreferences = (prefs) => {
    this.setState({ preferences: Object.assign(this.state.preferences, prefs) });
    localStorage.setItem(this.props.id, JSON.stringify(this.state.preferences));
  }

  reorderColumns = (startIndex, endIndex) => {
    const columnOrder = Array.from(this.state.preferences.columnOrder);
    const [removed] = columnOrder.splice(startIndex, 1);
    columnOrder.splice(endIndex, 0, removed);
    this.setPreferences({ columnOrder });
  }

  onColumnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    this.reorderColumns(result.source.index, result.destination.index);
  }

  propertiesRenderer = () => {
    return <ClickOutside handleClickOutside={() => this.setState({ displayingFields: false })}>
      {({ registerChild }) => 
        <div className="datatable__fields">
          <a className={`datatable__fields__toggle ${this.state.displayingFields ? 'datatable__fields__toggle--active' : ''}`} href="#" onClick={() => this.setState({ displayingFields: true })}><Icon style={{ width: 15 }} icon="details" /></a>
            <div ref={this.state.displayingFields ? registerChild : undefined} className={`datatable__fields__dropdown ${this.state.displayingFields ? 'datatable__fields__dropdown--visible' : ''}`}>
              <DragDropContext onDragEnd={this.onColumnDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => <div ref={provided.innerRef}>
                    {this.state.preferences.columnOrder.map((entry, idx, arr) => {
                      return <Draggable key={idx} draggableId={idx} index={idx}>
                        {(provided, snapshot) =>
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ display: 'flex', alignItems: 'center', opacity: snapshot.isDragging ? 0.5 : 1, ...provided.draggableProps.style }}>
                            <Checkbox wrapperClass={`datatable__fields__entry ${idx === arr.length - 1 ? 'datatable__fields__entry--last' : ''}`} name={entry} checked={this.state.preferences.columnDisplay[entry]} onChange={this.reloadColumns}>{this.getColumnName(entry)}</Checkbox>
                          </div>
                        }
                      </Draggable>;
                    })}
                  </div>}
                </Droppable>
              </DragDropContext>
            </div>
        </div>
      }
    </ClickOutside>;
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

  getGroupTitleIndices = () => {
    const groupTitles = [];
    let groupOffset = 0;
    for (let i = 0; i < this.state.groupedData.length; i++) {
      groupTitles.push(groupOffset);
      groupOffset += this.state.groupedData[i]._entries.length + 1;
    }
    return groupTitles;
  }

  adjustIndex = (index) => {
    if (this.state.groupedData) {
      const groupTitles = this.getGroupTitleIndices();
      let group = 0;
      for (let i = 0; i < groupTitles.length; i++) {
        if (index - (groupTitles[i] + 1) < 0) {
          break;
        }
        group = i;
      }
      const ret = { adjustedIndex: index - (groupTitles[group] + 1), group };
      return ret;
    } else {
      return { adjustedIndex: index, group: 0 };
    }
  }

  offsetIndex = (index) => {
    if (this.state.groupedData) {
      const groupTitles = this.getGroupTitleIndices();
      let group = 0;
      for (let i = 0; i < groupTitles.length; i++) {
        if (index < groupTitles[i]) {
          break;
        }
        group = i;
      }
      return index - (group + 1);
    } else {
      return index;
    }
  }

  getFilteredIds = () => {
    const filteredDataIds = (this.props.filter === undefined ? this.state.sortedData : this.state.sortedData.filter(this.props.filter)).map(d => d.id);
    console.log('filtered data ids', filteredDataIds);
    return this.props.filter === undefined ? this.props.ids :
      this.props.ids.filter((id, idx) => !this.isRowLoaded({ index: idx }) || filteredDataIds.includes(id));
  }

  rowGetter = ({ index }) => {
    const data = this.props.filter === undefined ? this.state.sortedData : this.state.sortedData.filter(this.props.filter);
    if (this.state.groupedData) {
      const groupIndex = this.getGroupTitleIndices().indexOf(index);
      if (groupIndex !== -1) {
        return { _group: this.state.groupedData[groupIndex]._name };
      } else {
        const { adjustedIndex, group } = this.adjustIndex(index);
        return this.state.groupedData[group]._entries[adjustedIndex] || { _loading: true };
      }
    }
    const row = data[index];
    return row === undefined ? (this.isRowLoaded({ index }) ? { _hide: true } : { _loading: true }) : row;
  };

  rowRenderer = ({ className, key, columns, rowData, style }) => {
    if (rowData._loading) {
      return <div className={`${className} ${className}--loading`} key={key} role="row" style={style}>
        <span>Loading...</span>
      </div>;
    } else if (rowData._group) {
      return <div className={`${className} ${className}--groupHeading`} key={key} role="row" style={style}>
        <span>{rowData._group}</span>
      </div>;
    } else if (rowData._hide) {
      return <div className={`${className} ${className}--empty`} key={key} style={style}></div>;
    } else {
      return <div className={`${className} ${className}--data`} key={key} role="row" style={style}>
        {columns}
      </div>;
    }
  }

  // Don't forget that this accepts an *object* as an argument!!!
  isRowLoaded = ({ index }) => {
    const offsetIndex = this.offsetIndex(index);
    const data = this.props.filter === undefined ? this.state.sortedData : this.state.sortedData.filter(this.props.filter);
    return !!this.state.sortedData[offsetIndex];
  }

  switchLocale = () => {
    this.setState({ locale: this.state.locale == 'en' ? 'et' : 'en' });
  }

  reloadColumns = (e) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.preferences.columnDisplay[e.target.name] = !this.state.preferences.columnDisplay[e.target.name];
    this.setPreferences(this.state.preferences);
    this.forceUpdate();
  }

  rowCount = () => {
    if (this.props.ids === null) {
      return 1;
    }
    const length = this.props.ids.length;
    return this.state.groupedData ? length + this.state.groupedData.length : length;
  }

  loadMoreRows = ({ startIndex, stopIndex }) => new Promise((resolve, reject) => {
    const offsetStartIndex = this.offsetIndex(startIndex);
    const offsetStopIndex = this.offsetIndex(stopIndex);
    this.props.rowLoader(offsetStartIndex, offsetStopIndex).then((data) => {
      const existingData = data.filter(ed => !this.state.data.map(d => d.id).includes(ed.id));
      this.setState({ data: this.state.data.concat(existingData), sortedData: this.state.sortedData.concat(existingData) });
      this.groupRows();
      this.forceUpdate();
      resolve();
    }).catch((e) => reject(e));
  });

  render() {
    const {
      sortBy,
      sortDirection
    } = this.state;

    const columnArray = this.state.preferences.columnOrder.filter(c => this.state.preferences.columnDisplay[c]);
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
          rowHeight={({ index }) => this.rowGetter({ index })._hide ? 0 : 60}
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

DataTable.propTypes = {
  id: PropTypes.string
};

export default DataTable;