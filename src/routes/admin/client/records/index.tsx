import styles from './Records.module.scss';
import React, {useContext} from 'react';
import {Context} from '../Context';
import useOpen from '@hooks/useOpen';
import Cover from '@components/cover/Cover';
import Container from '@components/containers/Style1';

const Records = () => {

    const {openValue, onOpenValue} = useOpen({});

    const {data} = useContext(Context);

    return (
        <div className={styles.container}>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Medical</th>
                    <th>Name</th>
                    <th>Dob</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Marketing</th>
                </tr>
                {data.map(el => 
                    <tr key={el._id} className={styles.element}>
                        <td>{new Date(el.timestamp).toISOString().split("Z").join(" ").split("T").join(", ").slice(0, 20)}</td>
                        <td>
                            <>
                            {el.medical_history ? <button onClick={() => onOpenValue(el._id)}>view</button> : ""}
                            {openValue &&
                                <Cover onClose={() => onOpenValue("")}>
                                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                                        <h3>{el.first_name} {el.last_name}, medicial history</h3>
                                        <p>{el.medical_history}</p>
                                    </Container>
                                </Cover>
                            }
                            </>
                        </td>
                        <td>{el.first_name} {el.last_name}</td>
                        <td>{el.date_of_birth} </td>
                        <td>{el.email} </td>
                        <td>{el.phone} </td>
                        <td>{el.address}, {el.city}, {el.postcode} </td>
                        <td>{el.marketing ? "YES" : "NO"}</td>
                    </tr>
                )}
            </table>

        </div>
    )
}

export default Records