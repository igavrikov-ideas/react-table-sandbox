import React from 'react';

const Checkbox = ({ name, children, wrapperClass, ...rest }) => <div className={wrapperClass}>
  <input type="checkbox" id={name} name={name} {...rest} className="checkbox checkbox--right" />
  <label htmlFor={name}>
    <p></p>
    <span className="dropdown-item-label">{children}</span>
  </label>
</div>;

export default Checkbox;