import styles from './Content.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {IServicesApi} from '@database/models/services';
import {api} from '@database/api';
import {upload, remove} from '@thirdparty/nftstorage';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';
import Flex from '@components/flex/Style1';

import File from './File';

interface ParentsProps {
    on: "" | "header",
    setOn: React.Dispatch<React.SetStateAction<"" | "header">>,
}

const ContentIndex = () => {

    const {selectedData, actions} = useContext(Context);

    const [on, setOn] = useState<'header' | "">("");

    const props = {
        on, 
        setOn,
        selectedData
    }

    return ( actions === "reorder" ?
                <div className={styles.empty}>
                    <p>Select a data set to edit</p>
                </div>
            :
             !selectedData ? 
                <div className={styles.empty}>
                    <p>Select a data set to edit</p>
                </div>
            :
                <div className={styles.container}>
                    <h1 className={styles.header} onClick={() => setOn("header")}>{selectedData.name}</h1>
                    {on === "header" && <ONHeader {...props} />}
                </div>
    )
};

const ONHeader = ({setOn}: ParentsProps) => {

    const {selectedData, onUpdateData} = useContext(Context);

    const {onSubmit, onChange, values, loading} = useForm(selectedData, callback);

    async function callback(){
        try{
            const response = await api.patch("/services", values);
            onUpdateData(response.data.data);
        } catch(err){
            console.log(err);
        }
    };

    const onDeleteItem = () => {

    }

    return (
        <Cover onClose={() => setOn("")}>
            <Container style={{"maxWidth": "500px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <Flex>
                        <h2>{selectedData?.name}</h2>
                        <Button label1={"delete"} color="red" onClick={onDeleteItem}/>
                    </Flex>
                    
                    <Line />

                    <Input label1="Header" name="name" value={values?.name || ""} onChange={onChange} />
        
                    <Button label1="update" type="submit" loading={loading} color="black" />
                </form>
            </Container>
        </Cover>
    )
}

export default ContentIndex;

const Child = ({data, index}: {data: IServicesApi, index: number}) => {

    const {onRemoveData, onUpdateData} = useContext(Context);

    const [on, setOn] = useState<"main" | "append" | "">("");

    const {values, onChange, onSubmit, edited, loading, onSetValue} = useForm(data, callback);

    async function callback(){
        try{
            const response = await api.patch("/news", values);
            onUpdateData(response.data.data)
        } catch(err){
            console.log(err);
        }
    };
    
    return(
        <div className={styles.child}>

            <div className={styles.header}>
                <div>
                    <p>{data.name}</p>
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}


/* 

    const onUploadImage = async (blob: any) => {
        // const urls: string[] = [];
        // for(let i = 0; i < blob.length; i++){
        //     const {url} = await upload(blob[i]);
        //     urls.push(url);
        // };
        // const updatedImages = [...values.images, ...urls];
        // onSetValue({images: updatedImages});
        // values.images = updatedImages;
        // await api.patch("/news", values)
    };

    const onDeleteImage = async (cid: string, index: number) => {
        // await remove(cid);
        // const removedImage = values.images.filter((el, i) => index !== i);
        // values.images = removedImage;
        // onSetValue({images: removedImage});
        // await api.patch("/news", values);
    };

    const onDeleteNews = async () => {
        // await api.delete(`/news/${data._id}`);
        // onRemoveData(data);
    };

*/