import React from 'react';
import classes from './InstaImage.module.css';

const instaImage = (props) => {
    let media = null;

    if (props.mediaType === 'GraphVideo') {
        media = (
            <video 
                controls
                autoPlay="autoplay"
                playsInline
                type="video/mp4"
                src={props.src}
                className={classes.Image} >Video could not load</video>
        );
    } else {
        media = <img className={classes.Image} src={props.src} alt="recent instagram posts"/>;
    }

    return (
        <div className={classes.InstaImage}>
            {media}
        </div>
    );
};

export default instaImage;