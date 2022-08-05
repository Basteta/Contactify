import {Fragment, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faList} from "@fortawesome/free-solid-svg-icons";

import Checkbox from "./components/UI/Checkbox";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import Dropdown from "./components/UI/Dropdown";
import ListElement from "./components/ListElement";
import Modal from "./components/UI/Modal";

import {useApi} from "./hooks/useApi";
import {useWindowSize} from "./hooks/useWindowSize";

import classes from './App.module.scss';
import userpic from './utils/userpic.jpg';

function App() {
    const [searchName, setSearchName] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [checked, setChecked] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [checkedName, setCheckedName] = useState(true);
    const [checkedCity, setCheckedCity] = useState(true);
    const [checkedEmail, setCheckedEmail] = useState(true);
    const [checkedPhone, setCheckedPhone] = useState(true);
    const [sorted, setSorted] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [filter, setFilter] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const {data, error, loading, fetchData} = useApi();
    const size = useWindowSize();

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const sortHandler = () => {
       data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        setSorted(true);
    }

    const showActiveHandler = () => {
        setChecked(!checked);
    };

    const nameCheckHandler = () => {
        setCheckedName(!checkedName);
        setOpen(!open);
    }

    const cityCheckHandler = () => {
        setCheckedCity(!checkedCity);
        setOpen(!open);
    }

    const emailCheckHandler = () => {
        setCheckedEmail(!checkedEmail);
        setOpen(!open);
    }

    const phoneCheckHandler = () => {
        setCheckedPhone(!checkedPhone);
        setOpen(!open);
    }

    const cityChangeHandler = (selectedOption) => {
        setSelectedCity(selectedOption);
    }

    const handleClick = () => {
        setFilter(true);
        setFilteredData([searchName, selectedCity, checked]);
    }

    const userSelectHandler = (user) => {
        setSelectedData(user);

        if (size.width <= 1290) {
            setIsModal(true);
        }
    }

    const closeHandler = () => {
        setIsModal(false);
    }

    const showListHandler = () => {
        setOpen(!open);
    }

    let dropdown;
    let initialOptions = [{label: 'City', value: 'City'}];

    dropdown = <Dropdown options={initialOptions} onSelectOptions={cityChangeHandler}/>

    if (!loading && data) {
        let options = data.map(item => {
            return {
                'label': item.city,
                'value': item.city
            };
        })

        dropdown = <Dropdown options={options} onSelectOptions={cityChangeHandler}/>
    }

    const ModalContent = <Fragment>
        <div className={classes.grey}>
            <div className={classes.picContainer}>
                <img src={userpic} className={classes.userPic} alt="userpic"/>
            </div>
            <div className={classes.line}>
                <div className={classes.name}>Name:</div>
                <div className={classes.value}>{selectedData.name}&nbsp;
                    <div className={classes.short}>{selectedData.surname}</div>
                </div>
            </div>
            <div className={classes.line}>
                <div className={classes.name}>City:</div>
                <div className={classes.value}>{selectedData.city}</div>
            </div>
            <div className={classes.line}>
                <div className={classes.name}>Email:</div>
                <div className={`${classes.value} ${classes.underline}`}>{selectedData.email}</div>
            </div>
            <div className={classes.line}>
                <div className={classes.name}>Phone:</div>
                <div className={classes.value}>{selectedData.phone}</div>
            </div>
        </div>
    </Fragment>

    return (
        <div className="App">
            {isModal && (
                <Modal title='Contactify' onClose={closeHandler}>
                    {ModalContent}
                </Modal>
            )}
            <main className={classes.main}>
                <div className={classes.card}>
                    <div className={classes.leftSide}>
                        <div className={classes.header}>
                            <div>
                                <Input placeholder="Name" onChangeSearchQuery={(searchName) => {
                                    setSearchName(searchName);
                                }}/>
                            </div>
                            <div>
                                {dropdown}
                            </div>
                            <Checkbox label="Show active"
                                      value={checked}
                                      onChange={showActiveHandler}
                                      icon={true}
                                      bold={true}>
                            </Checkbox>
                            <Button onClick={handleClick}>Filter</Button>
                        </div>
                        <div className={`${classes.tableHeader} ${classes.background}`}>
                            <div className={classes.tableHeader}>
                                <div className={`${classes.name} ${checkedName ? '' : classes.hidden}`} onClick={sortHandler}>
                                    Name<FontAwesomeIcon icon={faArrowDown} className={classes.icon}/>
                                </div>
                                <div className={`${classes.city} ${checkedCity ? '' : classes.hidden}`}>City</div>
                                <div className={classes.empty}></div>
                                <div className={`${classes.email} ${checkedEmail ? '' : classes.hidden}`}>Email</div>
                                <div className={`${classes.phone} ${checkedPhone ? '' : classes.hidden}`}>Phone</div>
                                <div className={`${classes.list} ${open ? classes.white : ''}`} onClick={showListHandler}>
                                    <FontAwesomeIcon icon={faList} className={classes.icon} />
                                </div>
                                <div className={`${classes.multiselect} ${open ? classes.visible : ''}`}>
                                    <div className={classes.container}>
                                        <div className={classes.element}>
                                            <Checkbox label="Name" value={checkedName} onChange={nameCheckHandler}></Checkbox>
                                        </div>
                                        <div className={classes.element}>
                                            <Checkbox label="City" value={checkedCity} onChange={cityCheckHandler}></Checkbox>
                                        </div>
                                        <div className={classes.element}>
                                            <Checkbox label="Email" value={checkedEmail} onChange={emailCheckHandler}></Checkbox>
                                        </div>
                                        <div className={classes.element}>
                                            <Checkbox label="Phone" value={checkedPhone} onChange={phoneCheckHandler}></Checkbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.tableBody}>
                            <ListElement
                                data={data}
                                loading={loading}
                                error={error}
                                filter={filter}
                                filteredData={filteredData}
                                checkedName={checkedName}
                                checkedCity={checkedCity}
                                checkedPhone={checkedPhone}
                                checkedEmail={checkedEmail}
                                open={open}
                                setSelectedData={userSelectHandler}>
                            </ListElement>
                        </div>
                    </div>
                    <div className={classes.rightSide}>
                        <div className={classes.title}>contactify</div>
                        <div className={classes.background}></div>
                        {ModalContent}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
