import React, {useState, Fragment, useRef} from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";

import ErrorModal from "../UI/ErrorModal";

import classes from './AddUser.module.css';

const AddUser = (props) => {
    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');

    const [error, setError] = useState();

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value)
    // }

    // const ageChangehandler = (event) => {
    //     setEnteredAge(event.target.value)
    // }


    const addUserHandler = (event)=> {
        event.preventDefault();
        const typedName = nameInputRef.current.value;
        const typedAge = ageInputRef.current.value;

        if(typedName.trim().length === 0 || typedAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty inputs)'
            });
            return;
        }
        if(+typedAge < 1) {
            setError({
                title: 'Invalid Input',
                message: 'Age should be a number (>0)'
            })
            return;
        }
        props.onAddUser(typedName, typedAge)
        nameInputRef.current.value ='';
        ageInputRef.current.value ='';
    }


    const errorHandler = () => {
        setError(null);
    }


    return(
        <Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>Username</label>
                    <input 
                        id='username' 
                        type="text" 
                        // onChange={usernameChangeHandler} 
                        // value={enteredUsername} 
                        ref={nameInputRef} 
                    />
                    <label htmlFor='age'>Age (Years)</label>
                    <input 
                        id='age' 
                        type="number" 
                        // onChange={ageChangehandler} 
                        // value={enteredAge}
                        ref={ageInputRef} 
                    />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </Fragment>
        
    );
};

export default AddUser;