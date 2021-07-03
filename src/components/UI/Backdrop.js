import React from 'react';
import ReactDom from 'react-dom'


const Backdrop=(props)=>{

    const modal=<div className="backdrop">{props.children}</div>;

    return(
        <React.Fragment>
            {ReactDom.createPortal(modal,document.getElementById('backdrop-root'))}
        </React.Fragment>
    );
};

export default Backdrop;