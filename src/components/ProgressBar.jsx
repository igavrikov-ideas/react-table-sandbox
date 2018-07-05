import React from 'react';

const ProgressBar = ({ value, maxValue }) => {
    const progress = value / maxValue;
    return <div className="progress-container">
        <div className="progress">
            <div className="progress-bar bg-info" role="progressbar" style={{ width: `${Math.floor(progress * 100)}%` }}></div>
        </div>
    </div>;
};

export default ProgressBar;