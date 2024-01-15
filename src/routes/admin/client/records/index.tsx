import styles from './Records.module.scss';
import React, {useContext, useEffect} from 'react';
import { Context } from '../Context';
import { MdDelete } from "react-icons/md";
import useOpen from '@hooks/useOpen';
import Cover from '@components/cover/Cover';
import Round from '@components/button/Round';
import { IClientApi } from '@database/models/client';
import { api } from '@database/api';

const Records = () => {

    const {openValue, onOpenValue} = useOpen({});

    const {data, onRemoveData} = useContext(Context);

    const onDelete = async (data: IClientApi) => {
        onRemoveData(data);
        await api.delete(`/client/${data._id}`);
    };

    useEffect(() => {
        if(openValue) document.body.classList.add("bodyScrollBar");
        return () => document.body.classList.remove('bodyScrollBar');
    }, [openValue]);

    return (
        <div className={styles.container}>
            <table>
                <tbody>
                    <tr>
                        <th></th>
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
                            <td><Round onClick={() => onDelete(el)} label1={<MdDelete/>} color="red" /> </td>
                            <td>{new Date(el.timestamp).toISOString().split("Z").join(" ").split("T").join(", ").slice(0, 20)}</td>
                            <td>
                                <>
                                {el.medical_history ? <button onClick={() => onOpenValue(el._id)}><p>view</p></button> : ""}
                                {openValue === el._id &&
                                    <Cover onClose={() => onOpenValue("")}>
                                        <div className={styles.medicial} onClick={e => e.stopPropagation()}>
                                            <h3>{el.first_name} {el.last_name}, medicial history</h3>
                                            <p>{el.medical_history}</p>
                                        </div>
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
                </tbody>
            </table>

        </div>
    )
}

export default Records