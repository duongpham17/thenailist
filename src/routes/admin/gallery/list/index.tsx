import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IGalleryApi} from '@database/models/gallery';
import {api} from '@database/api';
import {generateid} from '@utils/function';
import useForm from '@hooks/useForm';

import File from './File';
import Line from '@components/line/Style1';
import Round from '@components/button/Round';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';

import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai'
import { remove, upload } from '@thirdparty/nftstorage';

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

const Element = ({element}: {element: IGalleryApi} ) => {

    const {onUpdateData, onRemoveData} = useContext(Context);

    const [on, setOn] = useState<"create" | "edit" | "header" | "image" | "">("");

    const [reorderIndex, setReorderIndex] = useState(-1);

    const {onChange, onSubmit, values, onClear, loading, onSetValue, setValues} = useForm(element, callback);

    async function callback(){
        try{
            const response = await api.patch("/gallery", values);
            onClear();
            setValues(values);
            return onUpdateData(response.data.data);
        } catch(err){
            console.log(err)
        }
    };

    const onEditHeader = (name: string) => {
        setOn("header");
        onSetValue({name});
    };

    const onReorder = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        if(reorderIndex === index) return setReorderIndex(-1);
        if(reorderIndex === -1) return setReorderIndex(index);
        const newData = element.src[index];
        const oldData = element.src[reorderIndex];
        const dataUpdated = {...element};
        dataUpdated.src[reorderIndex] = newData;
        dataUpdated.src[index] = oldData;
        const response = await api.patch("/gallery", dataUpdated);
        setReorderIndex(-1);
        return onUpdateData(response.data.data);
    };

    const onDelete = async (index: number) => {
        const dataUpdated = {...element};
        dataUpdated.src.splice(index, 1);
        const response = await api.patch("/gallery", dataUpdated);
        setOn("");
        return onUpdateData(response.data.data);
    };

    const onDeleteList = async () => {
        const response = await api.delete(`/gallery/${element._id}`);
        setOn("");
        return onRemoveData(response.data.data);
    };

    const onUploadImage = async (blob: any) => {
        const urls: string[] = [];
        for(let i = 0; i < blob.length; i++){
            const {url} = await upload(blob[i]);
            urls.push(url);
        };
        const updatedImages = [...urls, ...values.src];
        values.src = updatedImages;
        onSetValue({src: updatedImages});
        await api.patch("/gallery", values)
    };

    const onDeleteImage = async (cid: string, index: number) => {
        await remove(cid);
        const removedImage = values.src.filter((el, i) => index !== i);
        values.src = removedImage;
        onSetValue({src: removedImage});
        await api.patch("/gallery", values);
    };

    return (
        <div className={styles.element}>

            <header>
                <Button label1={<h3>{element.name}</h3>} onClick={() => onEditHeader(element.name)} />
                <Round label1={<AiOutlinePlus size={13}/>} color="black" onClick={() => setOn("create")}/>
            </header>

            <Line color="black"/>

            <div className={styles.images}>
                {values.src.map((el, index) => 
                    <div key={generateid()}>
                        <img src={el} alt="THENAILIST" onClick={(e) => onReorder(e, index)} className={index === reorderIndex ? styles.selected : ""}/>    
                        <button onClick={() => onDelete(index)}><AiFillDelete/></button>
                    </div>
                )}
            </div>
            
            {(on === "create" || on === "edit") &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "600px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <File 
                            id={element._id}
                            src={[]}
                            onUpload={onUploadImage}
                            onDelete={onDeleteImage}
                        />
                    </Container>
                </Cover>
            }

            { on === "header" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "600px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <header>
                                <Button warning label1={"Delete List"} color="red" onClick={onDeleteList}/>
                            </header>

                            <Line />

                            <Input label1="Name" name="name" value={values.name} onChange={onChange} />
            
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}