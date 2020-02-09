import React from 'react';
import classes from './InstaHeader.module.css';

const instaHeader = (props) => {

    let location = null;

    if (props.location) {
        location = <div className={classes.Location}>{props.location}</div>;
    }

    return (
        <div className={classes.InstaHeader}>
            <img
                src={props.profile}
                alt="profile"
                className={classes.Profile} />
            <div className={classes.Info}>
                <p><strong>{props.username}</strong></p>
                {location}
            </div>
        </div>
    );
};

export default instaHeader;