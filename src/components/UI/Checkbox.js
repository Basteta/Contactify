import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from '@fortawesome/free-regular-svg-icons';
import classes from './Checkbox.module.scss';

const Checkbox = ({label, value, onChange, icon, bold}) => {

    return (
        <div>
            <label className={`${classes.container} ${bold ? classes.bold : ''}`}>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                />
                {label}
                {icon && <FontAwesomeIcon icon={faEye} className={classes.icon}/>}
                <span className={classes.checkmark}></span>
            </label>
        </div>
    )
}

export default Checkbox;