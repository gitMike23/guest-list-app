import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";

import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const Modal = (props) => {
    <Card className={classes.modal}>
        <header className={classes.header}>
            <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
            <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
            <Button onClick={props.onConfirm}>Ok</Button>
        </footer>
    </Card>
}

const ErrorModal = (props)=> {
    return(
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop 
                onConfirm={props.onConfirm}
                />, 
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <Modal 
                onConfirm={props.onConfirm} 
                title={props.title} 
                message={props.message}
                />, 
                document.getElementById('modal-root')
            )}
        </Fragment>
        
    );
};

export default ErrorModal;