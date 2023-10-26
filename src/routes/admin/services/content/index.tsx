import styles from './Content.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IServicesApi} from '@database/models/services';
import {api} from '@database/api';
import {upload, remove} from '@thirdparty/nftstorage';
import { generateid } from '@utils/function';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Flex from '@components/flex/Style1';

import {HiMenuAlt4} from 'react-icons/hi';

import File from './File';

interface ParentsProps {
    on: "" | "header",
    setOn: React.Dispatch<React.SetStateAction<"" | "header">>,
}

const ContentIndex = () => {

    const {selectedData, actions, onUpdateData} = useContext(Context);

    const [reorderIndex, setReorderIndex] = useState(-1);

    const [on, setOn] = useState<'header' | "">("");

    const onReorder = async (index: number) => {
        if(!selectedData) return;
        if(reorderIndex === index) return setReorderIndex(-1);
        if(reorderIndex === -1) return setReorderIndex(index);
        setReorderIndex(-1);
        const newData = {...selectedData};
        const oldValue = selectedData.items[reorderIndex];
        const newValue = selectedData.items[index];
        newData.items[reorderIndex] = newValue;
        newData.items[index] = oldValue;
        onUpdateData(newData);
        await api.patch("/services", newData);
    };

    const props = {
        on, 
        setOn,
        selectedData
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
                    <h1 className={styles.header} onClick={() => setOn("header")}>{selectedData.name}</h1>
                    {on === "header" && <ONHeader {...props} />}
                    
                    <div className={styles.child}>
                        {selectedData.items.map((el, index) =>
                            <div className={styles.element}  key={el._id}>
                                <div className={styles.reorder}>
                                    <button className={reorderIndex === index ? styles.selected : ""} onClick={() => onReorder(index)}><HiMenuAlt4/></button>
                                </div>
                                <ChildItems element={el} index={index} />   
                            </div>
                         
                        )}
                    </div>
                </div>
    )
};

export default ContentIndex;

///

const ONHeader = ({setOn}: ParentsProps) => {

    const {selectedData, setSelectedData, onUpdateData, onRemoveData} = useContext(Context);

    const {onSubmit, onChange, values, loading} = useForm(selectedData, callback);

    async function callback(){
        try{
            const response = await api.patch("/services", values);
            onUpdateData(response.data.data);
        } catch(err){
            console.log(err);
        }
    };

    const onDeleteItem = async () => {
        try{
            const response = await api.delete(`/services/${selectedData?._id}`);
            onRemoveData(response.data.data);
            setOn("");
            setSelectedData(null);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <Cover onClose={() => setOn("")}>
            <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <Flex>
                        <h2>{selectedData?.name}</h2>
                        <Button label1="delete category" warning color="red" onClick={onDeleteItem} style={{fontSize: "0.8rem"}}/>
                    </Flex>
                    
                    <Line />

                    <Input label1="Header" name="name" value={values?.name || ""} onChange={onChange} />
        
                    <Button label1="update" type="submit" loading={loading} color="black" />
                </form>
            </Container>
        </Cover>
    )
};

const ChildItems = ({element, index}: {element: IServicesApi["items"][0], index: number}) => {

    const {onUpdateData, selectedData} = useContext(Context);

    const [on, setOn] = useState<"edit" | "image" | "button" | "">("");

    const {values, onChange, onSubmit, loading, onSetValue} = useForm(element, callback);

    async function callback(){
        if(!selectedData) return;
        try{
            const newData = {...selectedData};
            newData.items[index] = {...values};
            onUpdateData(newData);
            await api.patch("/services", newData);
        } catch(err){
            console.log(err);
        }
    };

    const onDeleteItem = async () =>{
        if(!selectedData) return;
        try{
            const newData = {...selectedData};
            newData.items.splice(index, 1);
            onUpdateData(newData);
            await api.patch("/services", newData);
        } catch(err){
            console.log(err);
        }
    };

    const onUploadImage = async (blob: any) => {
        if(!selectedData) return;
        const urls: string[] = [];
        for(let i = 0; i < blob.length; i++){
            const {url} = await upload(blob[i]);
            urls.push(url);
        };
        const updatedImages = [...values.images, ...urls];
        onSetValue({images: updatedImages});
        const newData = {...selectedData};
        newData.items[index] = {...newData.items[index], images: updatedImages};
        onUpdateData(newData);
        await api.patch("/services", newData);
    };

    const onDeleteImage = async (cid: string, i: number) => {
        if(!selectedData) return;
        await remove(cid);
        const removedImage = values.images.filter((el, vindex) => i !== vindex);
        onSetValue({images: removedImage});
        const newData = {...selectedData};
        newData.items[index] = {...newData.items[index], images: removedImage};
        onUpdateData(newData);
        await api.patch("/services", newData);
    };

    const onButton = (e: any) =>{
        e.stopPropagation();
        setOn("button")
    }

    return(
        <div className={styles.childItemsContainer} id={element._id}>
            <div className={styles.information} onClick={(e) => setOn("edit")}>
                <h2>{element.name}</h2>
                <p>{element.description}</p>
                <button className={styles.button} onClick={onButton}>{element.button.name || "link"}</button>
            </div>

            <div className={styles.images} onClick={() => setOn("image")}>
                <img src={element.images[0]} alt="THENAILIST"/>    
            </div>

            {on === "edit" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Button label1="delete" warning color="red" onClick={onDeleteItem} style={{fontSize: "0.8rem"}}/>
                        
                            <Line />

                            <Input label1="Name" name="name" value={values.name} onChange={onChange} />

                            <Textarea label1="description" name="description" value={values.description} onChange={onChange} />
                
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }
            
            {on === "image" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <File 
                            id={values._id!}
                            src={values.images}
                            onUpload={onUploadImage}
                            onDelete={onDeleteImage}
                        />
                    </Container>
                </Cover>
            }

            {on === "button" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Button label1="delete" warning color="red" onClick={onDeleteItem} style={{fontSize: "0.8rem"}}/>
                        
                            <Line />

                            <Input label1="Name of button" name="button.name" value={values.button.name} onChange={onChange} />

                            <Input label1="Url / Link" name="button.href" value={values.button.href} onChange={onChange} />
                
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }
        </div>
    )
}