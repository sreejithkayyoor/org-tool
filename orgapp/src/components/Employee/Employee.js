import styles from './Employee.module.css';

function Employee(props) {
    const { employee } = props
    return (
        <div className={styles.employee}>
            <div>
                <span>{employee.name}  ({employee.title})</span>
            </div>
            {employee.subordinates.length > 0 && employee.subordinates.map(item => {
                return <Employee key={item.id} employee={item} />
            })}
        </div>
    )
}

export default Employee;