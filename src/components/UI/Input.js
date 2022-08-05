import React, {useState} from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const changeHandler = (event) => {
        setSearchQuery(event.target.value);
        props.onChangeSearchQuery(searchQuery);
    }

    return (
        <input type="search" placeholder={props.placeholder} className={classes.input} onChange={changeHandler} />
    )
}

export default Input;