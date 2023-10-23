import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IPolicyApi} from '@database/models/policy';
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

const Element = ({element}: {element: IPolicyApi} ) => {

    const {onUpdateData, onRemoveData} = useContext(Context);

    const [on, setOn] = useState<"create" | "edit" | "header" | "">("");

    const [deleteIndex, setDeleteIndex] = useState(-1);

    const [reorderIndex, setReorderIndex] = useState(-1);

    const initialState: IPolicyApi["policy"][0] = {
        description: "",
    };

    const {onChange, onSubmit, values, onClear, loading, onSetValue, setValues} = useForm(initialState, callback);

    async function callback(){
        if(on === "create"){
            try{
                const valuesUpdate = {...element};
                valuesUpdate.policy = [values, ...valuesUpdate.policy];
                const response = await api.patch("/policy", valuesUpdate);
                onClear();
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        }
        if(on === "edit"){
            try{
                const valuesUpdate = {...element};
                const index = valuesUpdate.policy.findIndex(el => el._id === values._id);
                valuesUpdate.policy[index] = values;
                const response = await api.patch("/policy", valuesUpdate);
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        };
        if(on === "header"){
            try{
                const valuesUpdate = {...element};
                valuesUpdate.name = values.description;
                const response = await api.patch("/policy", valuesUpdate);
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

    const onEditPrices = (data: IPolicyApi["policy"][0], index: number) => {
        setOn("edit");
        setDeleteIndex(index)
        onSetValue(data)
    };

    const onEditHeader = (name: string) => {
        setOn("header");
        onSetValue({description: name});
    };

    const onReorder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        if(reorderIndex === -1) return setReorderIndex(index);
        const newData = element.policy[index];
        const oldData = element.policy[reorderIndex];
        const dataUpdated = {...element};
        dataUpdated.policy[reorderIndex] = newData;
        dataUpdated.policy[index] = oldData;
        const response = await api.patch("/policy", dataUpdated);
        setReorderIndex(-1);
        return onUpdateData(response.data.data);
    };

    const onDeletePrice = async () => {
        const dataUpdated = {...element};
        dataUpdated.policy.splice(deleteIndex, 1);
        const response = await api.patch("/policy", dataUpdated);
        setDeleteIndex(-1);
        setOn("");
        return onUpdateData(response.data.data);
    };

    const onDeletePriceList = async () => {
        const response = await api.delete(`/policy/${element._id}`);
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

            <div className={styles.map}>
                {element.policy.map((el, index) => 
                    <div key={el._id} className={`${styles.item} ${index === reorderIndex ? styles.selected : ""}`} onClick={() => onEditPrices(el, index)}>
                        <button onClick={(e) => onReorder(e, index)}>{index+1}.</button>
                        <p>{el.description}</p>
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

                            <Textarea label1="Description" name="description" value={values.description} onChange={onChange} />
                
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

                            <Input label1="" name="description" value={values.description} onChange={onChange} />
            
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}