import { Fragment, useCallback} from "react";
import classes from './Dropdown.module.scss';

const Dropdown = (props) => {
    const selectChangeHandler = useCallback ((event) => {
        const value = event.target.value;
        props.onSelectOptions(value);
    },[props]);

    return (
        <Fragment>
            <select onChange={selectChangeHandler} className={classes.select} defaultValue='City'>
                <option value='City' disabled>City</option>
                {props.options.map(option =>
                    <option key={option.label} value={option.value}>{option.label}</option>
                )}
            </select>
        </Fragment>

    )
}

export default Dropdown;