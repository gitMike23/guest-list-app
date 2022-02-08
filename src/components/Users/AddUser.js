import React, {useState} from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Wrapper from "../Helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";

import classes from './AddUser.module.css';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value)
    }

    const ageChangehandler = (event) => {
        setEnteredAge(event.target.value)
    }


    const addUserHandler = (event)=> {
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty inputs)'
            });
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid Input',
                message: 'Age should be a number (>0)'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)
        setEnteredUsername('')
        setEnteredAge('') 

    }


    const errorHandler = () => {
        setError(null);
    }


    return(
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type="text" onChange={usernameChangeHandler} value={enteredUsername} />
                    <label htmlFor='age'>Age (Years)</label>
                    <input id='age' type="number" onChange={ageChangehandler} value={enteredAge}/>
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </Wrapper>
        
    );
};

export default AddUser;