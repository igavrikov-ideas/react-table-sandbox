import React from 'react';
import PropTypes from 'prop-types';

class ClickOutside extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    handleClickOutside: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this._registeredChild && !this._registeredChild.contains(event.target)) {
      this.props.handleClickOutside(event);
      event.stopPropagation();
    }
  }

  _registerChild = (el) => {
    this._registeredChild = el;
  }

  render() {
    return this.props.children({ registerChild: this._registerChild });
  }
}

export default ClickOutside;