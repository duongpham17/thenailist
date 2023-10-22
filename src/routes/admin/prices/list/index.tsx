import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IPricesApi} from '@database/models/prices';
import {api} from '@database/api';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Round from '@components/button/Round';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';

import validation from './validation';

import {AiOutlinePlus} from 'react-icons/ai'

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

const Element = ({element}: {element: IPricesApi} ) => {

    const {onUpdateData, onRemoveData} = useContext(Context);

    const [on, setOn] = useState<"create" | "edit" | "header" | "">("");

    const [deleteIndex, setDeleteIndex] = useState(-1);

    const [reorderIndex, setReorderIndex] = useState(-1);

    const initialState: IPricesApi["prices"][0] = {
        name: "",
        price: 0,
        discount: 0
    };

    const {onChange, onSubmit, values, onClear, validationErrors, loading, onSetValue, setValues} = useForm(initialState, callback, validation);

    async function callback(){
        if(on === "create"){
            try{
                const valuesUpdate = {...element};
                valuesUpdate.prices = [values, ...valuesUpdate.prices];
                const response = await api.patch("/api/prices", valuesUpdate);
                onClear();
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        }
        if(on === "edit"){
            try{
                const valuesUpdate = {...element};
                const index = valuesUpdate.prices.findIndex(el => el._id === values._id);
                valuesUpdate.prices[index] = values;
                const response = await api.patch("/api/prices", valuesUpdate);
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        };
        if(on === "header"){
            try{
                const valuesUpdate = {...element};
                valuesUpdate.name = values.name;
                const response = await api.patch("/api/prices", valuesUpdate);
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        }
    };

    const onCreatePrice = () => {
        setOn("create");
        setValues(initialState)
    };

    const onEditPrices = (data: IPricesApi["prices"][0], index: number) => {
        setOn("edit");
        setDeleteIndex(index)
        onSetValue(data)
    };

    const onEditHeader = (name: string) => {
        setOn("header");
        onSetValue({name});
    };

    const onReorder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        if(reorderIndex === -1) return setReorderIndex(index);
        const newData = element.prices[index];
        const oldData = element.prices[reorderIndex];
        const dataUpdated = {...element};
        dataUpdated.prices[reorderIndex] = newData;
        dataUpdated.prices[index] = oldData;
        const response = await api.patch("/api/prices", dataUpdated);
        setReorderIndex(-1);
        return onUpdateData(response.data.data);
    };

    const onDeletePrice = async () => {
        const dataUpdated = {...element};
        dataUpdated.prices.splice(deleteIndex, 1);
        const response = await api.patch("/api/prices", dataUpdated);
        setDeleteIndex(-1);
        setOn("");
        return onUpdateData(response.data.data);
    };

    const onDeletePriceList = async () => {
        const response = await api.delete(`/api/prices/${element._id}`);
        setOn("");
        return onRemoveData(response.data.data);
    };

    return (
        <div className={styles.element}>
            <header>
                <Button label1={<h2>{element.name}</h2>} onClick={() => onEditHeader(element.name)} />
                <Round label1={<AiOutlinePlus size={13}/>} color="black" onClick={onCreatePrice}/>
            </header>

            <Line color="black"/>

            <div className={styles.prices}>
                {element.prices.map((el, index) => 
                    <div key={el._id} className={`${styles.item} ${index === reorderIndex ? styles.selected : ""}`} onClick={() => onEditPrices(el, index)}>
                        {el.discount > 0
                            ? 
                                <div className={styles.discount}>
                                    <p className={styles.name}>
                                        <button onClick={(e) => onReorder(e, index)}>{index + 1}. {el.name}</button> 
                                        <span>{el.discount} %</span>
                                    </p>
                                    <p className={styles.price}>
                                        <s>{el.price}</s> 
                                        <span>{Math.round(el.price * ( 1 - (el.discount / 100)))}</span>
                                    </p>
                                </div>
                            : 
                                <div>
                                        <button onClick={(e) => onReorder(e, index)}>{index + 1}. {el.name}</button> 
                                    <p>{el.price}</p>
                                </div> 
                        }
                    </div>
                )}
            </div>
            
            {(on === "create" || on === "edit") &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <header>
                                <h2>{element.name}</h2>
                                <Button label1={"delete"} color="red" onClick={onDeletePrice}/>
                            </header>
                            
                            <Line />

                            <Input label1="Name" error={validationErrors.name} name="name" value={values.name} onChange={onChange} />
                            
                            <Input label1="Price" type="number" name="price" value={values.price || ""} onChange={onChange}  />

                            <Input label1="Discount %" label2="optional" type="number" name="discount"  value={values.discount || ""}  onChange={onChange} />
                
                            <Button label1={on === "create" ? "create" : "update"} type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

            { on === "header" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <header>
                                <h2>{element.name}</h2>
                                <Button label1={"Delete List"} color="red" onClick={onDeletePriceList}/>
                            </header>

                            <Line />

                            <Input label1="" error={validationErrors.name} name="name" value={values.name} onChange={onChange} />
            
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}