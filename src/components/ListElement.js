import React, {Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";

import Loader from "./UI/Loader";
import classes from "./ListElement.module.scss";

const ListElement = (props) => {
    let List = props.data;
    const name = props.filteredData[0];
    const city = props.filteredData[1];
    const checked = props.filteredData[2];

    if (props.filter) {
        if (name !== '') {
            List = List.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        }

        if (city !== '') {
            List = List.filter(user => user.city.toLowerCase().includes(city.toLowerCase()));
        }

        if (checked) {
            List = List.filter(user => user.isActive === true);
        }

        if (!checked) {
            List = List.filter(user => user.isActive === false);
        }
    }

    let content;

    if (props.loading) {
        content = <Loader></Loader>;
    }

    if (props.error) {
        content = <p>Error!</p>
    }

    if (!props.loading && !props.error) {
        content = List.map((el) =>
            <li key={el.id} className={`${classes.element} ${props.open ? classes.overlay : ''}`}
                onClick={() => props.setSelectedData(el)}>
                <div className={`${classes.name} ${props.checkedName ? '' : classes.hidden}`}>
                    {el.name}&nbsp;<div className={classes.short}>{el.surname}</div>.
                </div>
                <div className={`${classes.city} ${props.checkedCity ? '' : classes.hidden}`}>{el.city}</div>
                <div className={classes.icon}>{el.isActive ?
                    <FontAwesomeIcon icon={faEye}/> :
                    <FontAwesomeIcon icon={faEyeSlash}/>}
                </div>
                <div className={`${classes.email} ${props.checkedEmail ? '' : classes.hidden}`}>{el.email}</div>
                <div className={`${classes.phone} ${props.checkedPhone ? '' : classes.hidden}`}>{el.phone}</div>
                <div className={classes.empty}></div>
            </li>
        )
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default ListElement;