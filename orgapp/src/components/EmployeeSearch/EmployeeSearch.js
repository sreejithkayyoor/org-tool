import { useRef } from "react";
import styles from "./EmployeeSearch.module.css";


function EmployeeSearch(props) {
    const searchText = useRef()

    function onChangeHandler() {
        props.searchHandler(searchText.current.value);
    }
    return (
        <div className={styles['employee-search']}>
            <div>
                <h2>Employee Search</h2>
            </div>
            <div>
                <input type="text" ref={searchText} placeholder="Type your search here" onChange={onChangeHandler} />
            </div>
        </div>
    );
}

export default EmployeeSearch;