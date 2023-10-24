import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IReviewsApi} from '@database/models/reviews';
import {api} from '@database/api';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Round from '@components/button/Round';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';

import {AiOutlinePlus} from 'react-icons/ai'

const List = () => {

    const {data, actions} = useContext(Context);

    if(data.length){
        return ( (actions === "" || actions === "create")
            ?
                <div className={styles.container}>
                    {data.map((el, index) => 
                        <Element element={el} key={el._id} index={index} />
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

const Element = ({element, index}: {element: IReviewsApi, index: number} ) => {

    const {onUpdateData, onRemoveData, setData} = useContext(Context);

    const [on, setOn] = useState<"edit" | "">("");

    const initialState = {
        review: "",
        name: ""
    };

    const {onChange, onSubmit, values, onClear, loading, setValues} = useForm(initialState, callback);

    async function callback(){
        try{
            const response = await api.patch("/reviews", values);
            return onUpdateData(response.data.data);
        } catch(err){
            console.log(err)
        }
    };

    const onEditReview = () => {
        setOn("edit");
        setValues(element)
    };

    const onDeleteReview = async () => {
        try{
            const response = await api.delete(`/reviews/${element._id}`);
            return onUpdateData(response.data.data);
        } catch(err){
            console.log(err)
        }
    };

    return (
        <div className={styles.element}>

            <div className={styles.review} onClick={onEditReview}>
                <p>{index+1}. {element.name}</p>
                <p>{element.review}</p>
            </div>
            
            {(on === "edit") &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <header>
                                <h2>{index+1}. {element.name}</h2>
                                <Button label1={"delete"} color="red" onClick={onDeleteReview}/>
                            </header>
                            
                            <Line />

                            <Input label1="name" name="name" value={values.name} onChange={onChange} />

                            <Textarea label1="review" name="review" value={values.review} onChange={onChange} />
                
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}