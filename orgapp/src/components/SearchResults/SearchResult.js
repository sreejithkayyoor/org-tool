import styles from './SearchResult.module.css';
import { useCallback, useEffect, useState } from "react"
import Employee from "../Employee/Employee";

function SearchResult(props) {
    const [results, setResults] = useState([]);
    const { keyword } = props;

    const findSubordinates = useCallback((arr, word) => {
        let result = [];
        if (arr.length === 0) return []
        arr.forEach(element => {
            if (element.name.toLowerCase().includes(word.toLowerCase())) {
                result.push({
                    ...element,
                    subordinates: [...findSubordinates(element.subordinates, word)]
                })
            }
            else {
                result.push(
                    ...findSubordinates(element.subordinates, word)
                )
            }
        });
        return result;
    }, [])
    useEffect(() => {
        let result = fetch('http://localhost:4000/employees').then(res => {
            if (res.ok) {
                return res.json()
            }
            else if (res.status === 404) {
                throw (new Error('No results found'));
            }
        }).catch(err => {
            throw (err)
        });
        result.then(
            data => {
                if (!keyword)
                    setResults(data);
                if (data.length > 0 && keyword) {
                    let employees = [];
                    data.forEach(element => {
                        if (element.name.toLowerCase().includes(keyword.toLowerCase())) {
                            employees.push({
                                ...element,
                                subordinates: [...findSubordinates(element.subordinates, keyword)]
                            })
                        }
                        else {
                            employees.push(
                                ...findSubordinates(element.subordinates, keyword)
                            )
                        }
                    });
                    setResults(employees);
                }
            }
        ).catch(err => {
            console.log(err);
        })

    }, [keyword, findSubordinates]);
    return (
        <div className={styles.result}>
            <div className={styles['result-item-header']}>
                <h2>Results</h2>
            </div>

            {
                results.length === 0 && <div className={styles['result-item']}>No results found</div>
            }
            {
                results.length !== 0 && results.map(item =>
                    <div className={styles['result-item']}>
                        <Employee key={item.id} employee={item} />
                    </div>
                )
            }
        </div>
    )
}

export default SearchResult;