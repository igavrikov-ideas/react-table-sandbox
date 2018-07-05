import React from 'react';

const Badge = ({ color, className, children }) => {
    return <span className={['badge', 'badge-pill', className].join(' ')} style={{ color }}>{children}</span>;
};

export default Badge;