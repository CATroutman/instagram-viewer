import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => {
    return (
        <div className={classes.loader} style={{justifySelf: 'center', alignSelf:'center'}} >
        </div>
    );
};

export default spinner;