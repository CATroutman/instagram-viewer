import React from 'react';
import classes from './InstaThumbs.module.css';


const instaThumbs = (props) => {

    let media = [];
    

    props.thumbs.forEach((src, index) => {
        const imgClasses = [classes.Thumbnail];

        if (index === props.current) {
            imgClasses.push(classes.Active);
        } else {
            imgClasses.push(classes.Inactive);
        }

        const img = (
            <div
                className={imgClasses.join(' ')}
                style={{backgroundImage: `url(${src})`}}
                key={index}
                onClick={() => props.clicked(index)} />
        );

        media.push(img);
    });

    return (
        <div className={classes.InstaThumbs}>
            {media}
        </div>
    );
};

export default instaThumbs;