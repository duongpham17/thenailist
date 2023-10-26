import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {ICareersApi} from '@database/models/careers';
import {api} from '@database/api';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Textarea from '@components/inputs/Textarea';

const List = () => {

    const {data, actions} = useContext(Context);

    if(data.length){
        return ( (actions === "" || actions === "create")
            ?
                <div className={styles.container}>
                    {data.map((el) => 
                        <Element element={el} key={el._id} />
                    )}
                </div>
            :
            null
        )
    }

    return ( 
        <div>
            Nothing 
        </div>
    )
}

export default List;

const Element = ({element}: {element: ICareersApi} ) => {

    const {onUpdateData, onRemoveData} = useContext(Context);

    const [on, setOn] = useState<"edit" | "">("");

    const {onChange, onSubmit, values, loading} = useForm(element, callback);

    async function callback(){
        try{
            const response = await api.patch("/careers", values);
            return onUpdateData(response.data.data);
        } catch(err){
            console.log(err)
        }
    };

    const onDeleteList = async () => {
        try{
            const response = await api.delete(`/careers/${element._id}`);
            onRemoveData(response.data.data)
            return onUpdateData(response.data.data);
        } catch(err){
            console.log(err)
        }
    };

    return (
        <div className={styles.element}>

            <div className={styles.review} onClick={() => setOn("edit")}>
                <p>{element.message}</p>
            </div>
            
            {(on === "edit") &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Button label1={"delete"} color="red" onClick={onDeleteList}/>
                            
                            <Line />

                            <Textarea label1="message" name="message" value={values.message} onChange={onChange} />
                
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}