import React from 'react';
import classes from './InstaCaption.module.css';

const instaCaption = (props) => {
    return (
        <div className={classes.InstaCaption}>
            <p><strong>{props.username}</strong> {props.caption}</p>
        </div>
    );
};

export default instaCaption;