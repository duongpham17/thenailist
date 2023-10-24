import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IFaqApi} from '@database/models/faq';
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

const Element = ({element}: {element: IFaqApi} ) => {

    const {onUpdateData, onRemoveData} = useContext(Context);

    const [on, setOn] = useState<"create" | "edit" | "header" | "">("");

    const [deleteIndex, setDeleteIndex] = useState(-1);

    const [reorderIndex, setReorderIndex] = useState(-1);

    const initialState: IFaqApi["questions"][0] = {
        question: "",
        answer: "",
    };

    const {onChange, onSubmit, values, onClear, loading, onSetValue, setValues} = useForm(initialState, callback);

    async function callback(){
        if(on === "create"){
            try{
                const valuesUpdate = {...element};
                valuesUpdate.questions = [values, ...valuesUpdate.questions];
                const response = await api.patch("/faq", valuesUpdate);
                onClear();
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        }
        if(on === "edit"){
            try{
                const valuesUpdate = {...element};
                const index = valuesUpdate.questions.findIndex(el => el._id === values._id);
                valuesUpdate.questions[index] = values;
                const response = await api.patch("/faq", valuesUpdate);
                return onUpdateData(response.data.data);
            } catch(err){
                console.log(err)
            }
        };
        if(on === "header"){
            try{
                const valuesUpdate = {...element};
                valuesUpdate.name = values.question;
                const response = await api.patch("/faq", valuesUpdate);
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

    const onEditPrices = (data: IFaqApi["questions"][0], index: number) => {
        setOn("edit");
        setDeleteIndex(index)
        onSetValue(data)
    };

    const onEditHeader = (name: string) => {
        setOn("header");
        onSetValue({question: name});
    };

    const onReorder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        if(reorderIndex === -1) return setReorderIndex(index);
        const newData = element.questions[index];
        const oldData = element.questions[reorderIndex];
        const dataUpdated = {...element};
        dataUpdated.questions[reorderIndex] = newData;
        dataUpdated.questions[index] = oldData;
        const response = await api.patch("/faq", dataUpdated);
        setReorderIndex(-1);
        return onUpdateData(response.data.data);
    };

    const onDeletePrice = async () => {
        const dataUpdated = {...element};
        dataUpdated.questions.splice(deleteIndex, 1);
        const response = await api.patch("/faq", dataUpdated);
        setDeleteIndex(-1);
        setOn("");
        return onUpdateData(response.data.data);
    };

    const onDeletePriceList = async () => {
        const response = await api.delete(`/faq/${element._id}`);
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
                {element.questions.map((el, index) => 
                    <div key={el._id} className={`${styles.item} ${index === reorderIndex ? styles.selected : ""}`} onClick={() => onEditPrices(el, index)}>
                        <button onClick={(e) => onReorder(e, index)}>{index+1}.</button>
                        <div>
                            <p>Question: {el.question}</p>
                            <p>Answer: <br/> {el.answer}</p>
                        </div>
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

                            <Textarea label1="Question" name="question" value={values.question} onChange={onChange} />

                            <Textarea label1="Answer" name="answer" value={values.answer} onChange={onChange} />
                
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

                            <Input label1="" name="question" value={values.question} onChange={onChange} />
            
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}