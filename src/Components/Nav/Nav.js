import React, { useState } from 'react';
import filterIcon from '../Assets/icons_FEtask/Display.svg';
import downIcon from '../Assets/icons_FEtask/down.svg';

import './Nav.css';

export default function NavigationBar(props) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    function toggleDisplay(e) {
        setIsFilterVisible(!isFilterVisible);
        if (e.target.value !== undefined) {
            props.handleGroupValue(e.target.value);
        }
    }
    
    function updateOrderingValue(e) {
        setIsFilterVisible(!isFilterVisible);
        if (e.target.value !== undefined) {
            props.handleOrderValue(e.target.value);
        }
    }
    
    return (
        <>
            <section className="navbar">
                <div className="navbar-container">
                    <div>
                        <div className="navbar-display-button" onClick={toggleDisplay}>
                            <div className="navbar-display-icon navbar-filter-icon">
                                <img src={filterIcon} alt="Filter Icon" />
                            </div>
                            <div className="navbar-display-heading">
                                Display
                            </div>
                            <div className="navbar-display-icon navbar-dropdown-icon">
                                <img src={downIcon} alt="Dropdown Icon" />
                            </div>
                        </div>
                        <div className={isFilterVisible ? "navbar-display-dropdown navbar-display-dropdown-show" : "navbar-display-dropdown"}>
                            <div className="navbar-display-filters">
                                <div className="navbar-dropdown-title">
                                    Grouping
                                </div>
                                <div className="navbar-dropdown-selector">
                                    <select value={props.groupValue} onChange={toggleDisplay} className='navbar-selector' name="grouping" id="">
                                        <option value="status">Status</option>
                                        <option value="user">User</option>
                                        <option value="priority">Priority</option>
                                    </select>
                                </div>
                            </div>
                            <div className="navbar-display-filters">
                                <div className="navbar-dropdown-title">
                                    Ordering
                                </div>
                                <div className="navbar-dropdown-selector">
                                    <select value={props.orderValue} onChange={updateOrderingValue} className='navbar-selector' name="ordering" id="">
                                        <option value="priority">Priority</option>
                                        <option value="title">Title</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
