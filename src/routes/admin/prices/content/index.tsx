import styles from './Content.module.scss';
import React, {useContext, useState, useEffect} from 'react';
import {Context} from '../Context';
import {IPricesApi} from '@database/models/prices';
import {api} from '@database/api';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';
import Flex from '@components/flex/Style1';

import {HiMenuAlt4} from 'react-icons/hi';

interface ParentsProps {
    reorderIndex: number,
    setReorderIndex: React.Dispatch<React.SetStateAction<number>>,
    on: "" | "header" | "subheaders",
    setOn: React.Dispatch<React.SetStateAction<"" | "header" | "subheaders">>,
}

const ContentIndex = () => {

    const {selectedData, actions} = useContext(Context);

    const [reorderIndex, setReorderIndex] = useState(-1);

    const [on, setOn] = useState<'header' | "subheaders" | "">("");

    const props = {
        on, 
        setOn,
        selectedData,
        reorderIndex,
        setReorderIndex
    };

    return ( actions === "reorder" ?
                null
            :
             !selectedData ? 
                <div className={styles.empty}>
                    <p>Select a data set to edit</p>
                </div>
            :
                <div className={styles.container}>
                    <ONHeader {...props} />
                    <div className={styles.child}>
                        <ONSubHeaders {...props}/>
                        {selectedData.prices.map((el, index) =>
                            <div className={styles.element} key={el._id}>
                                <ChildItems element={el} index={index} props={props} />   
                            </div>
                        )}
                    </div>
                </div>
    )
};

export default ContentIndex;

///
const ONHeader = ({setOn, on}: ParentsProps) => {

    const {selectedData, setSelectedData, onUpdateData, onRemoveData} = useContext(Context);

    const {onSubmit, onChange, values, loading, edited, setValues} = useForm(selectedData, callback);

    useEffect(() => setValues(selectedData), [selectedData]);

    async function callback(){
        try{
            const response = await api.patch("/prices", values);
            onUpdateData(response.data.data);
        } catch(err){
            console.log(err);
        }
    };

    const onDeleteItem = async () => {
        try{
            const response = await api.delete(`/prices/${selectedData?._id}`);
            onRemoveData(response.data.data);
            setOn("");
            setSelectedData(null);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.header} onClick={() => setOn("header")}>{selectedData?.name}</h1>
            {on === "header" && 
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Flex>
                                <h2>{selectedData?.name}</h2>
                                <Button label1="delete category" warning color="red" onClick={onDeleteItem} style={{fontSize: "0.8rem"}}/>
                            </Flex>
                            
                            <Line />

                            <Input label1="Header" name="name" value={values?.name || ""} onChange={onChange} />
                
                            {edited && <Button label1="update" type="submit" loading={loading} color="black" />}
                        </form>
                    </Container>
                </Cover>
            }
        </div>
    )
};

const ONSubHeaders = ({setOn, on}: ParentsProps) => {

    const {selectedData, setSelectedData, onUpdateData, onRemoveData} = useContext(Context);

    const {onSubmit, onChange, values, loading, edited, setValues} = useForm(selectedData, callback);

    useEffect(() => setValues(selectedData), [selectedData]);

    async function callback(){
        try{
            const response = await api.patch("/prices", values);
            onUpdateData(response.data.data);
        } catch(err){
            console.log(err);
        }
    };

    const onDeleteItem = async () => {
        try{
            const response = await api.delete(`/prices/${selectedData?._id}`);
            onRemoveData(response.data.data);
            setOn("");
            setSelectedData(null);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className={styles.subheadersContainer}>
            <div className={styles.subheaders} onClick={() => setOn("subheaders")}>
                <div />
                <div>
                    <p>{selectedData?.headers.second || "SECOND"}</p>
                    <p>{selectedData?.headers.first || "FIRST"}</p>
                </div>
            </div>
            {on === "subheaders" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Flex>
                                <h2>{selectedData?.name}</h2>
                                <Button label1="delete category" warning color="red" onClick={onDeleteItem} style={{fontSize: "0.8rem"}}/>
                            </Flex>
                            
                            <Line />

                            <Input label1="First Header" name="headers.first" value={values?.headers.first || ""} onChange={onChange} />

                            <Input label1="Second Header" name="headers.second" value={values?.headers.second || ""} onChange={onChange} />
                
                            {edited && <Button label1="update" type="submit" loading={loading} color="black" />}
                        </form>
                    </Container>
                </Cover>
            }
        </div>
    )
};


const ChildItems = ({element, index, props}: {element: IPricesApi["prices"][0], index: number, props: ParentsProps}) => {

    const {reorderIndex, setReorderIndex} = props;

    const {onUpdateData, selectedData} = useContext(Context);

    const [on, setOn] = useState<"edit" | "image" | "button" | "headers" | "">("");

    const {values, onChange, onSubmit, loading, edited} = useForm(element, callback);

    async function callback(){
        if(!selectedData) return;
        try{
            const newData = {...selectedData};
            newData.prices[index] = {...values};
            onUpdateData(newData);
            await api.patch("/prices", newData);
        } catch(err){
            console.log(err);
        }
    };

    const onDeleteItem = async () =>{
        if(!selectedData) return;
        try{
            const newData = {...selectedData};
            newData.prices.splice(index, 1);
            onUpdateData(newData);
            await api.patch("/prices", newData);
        } catch(err){
            console.log(err);
        }
    };

    const onReorder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if(!selectedData) return;
        if(reorderIndex === index) return setReorderIndex(-1);
        if(reorderIndex === -1) return setReorderIndex(index);
        setReorderIndex(-1);
        const newData = {...selectedData};
        const oldValue = selectedData.prices[reorderIndex];
        const newValue = selectedData.prices[index];
        newData.prices[reorderIndex] = newValue;
        newData.prices[index] = oldValue;
        onUpdateData(newData);
        await api.patch("/prices", newData);
    };

    return(
        <div className={styles.child} id={element._id}>

            <div className={styles.information}>
                <div className={styles.reorder}>
                    <button className={reorderIndex === index ? styles.selected : ""} onClick={onReorder}>
                        <HiMenuAlt4/>
                    </button>
                </div>
                <div className={styles.name} onClick={() => setOn("edit")}>
                    <p>{values.name}</p>
                    <small>{values.small}</small>
                </div>
                <div className={styles.headers}  onClick={() => setOn("edit")}>
                    <p>{values.hsecond || ""}</p>
                    <p>{values.hfirst || ""}</p>
                </div>
            </div>

            {on === "edit" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Button label1="delete" warning color="red" onClick={onDeleteItem} style={{fontSize: "0.8rem"}}/>
                        
                            <Line />

                            <Input label1="Name" name="name" value={values.name} onChange={onChange} />

                            <Input label1="Extra information" name="small" value={values.small} onChange={onChange} />

                            <Input label1={`1. ${selectedData?.headers.first}` || "Header"} type="number" name="hfirst" value={values.hfirst || ""} onChange={onChange} />

                            <Input label1={`2. ${selectedData?.headers.second}` || "Header"} type="number" name="hsecond" value={values.hsecond || ""} onChange={onChange} />
                
                            {edited && <Button label1="update" type="submit" loading={loading} color="black" />}
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}