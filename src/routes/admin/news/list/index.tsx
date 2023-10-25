import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {INewsApi} from '@database/models/news';
import {api} from '@database/api';
import {upload, remove} from '@thirdparty/nftstorage';
import useForm from '@hooks/useForm';

import Line from '@components/line/Style1';
import Button from '@components/button/Button';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';

import File from './File';
import Textarea from '@components/inputs/Textarea';

const List = () => {

    const {data, actions} = useContext(Context);

    if(data.length){
        return ( (actions === "")
            ?
                <div className={styles.container}>
                    {data.map((el, index) => 
                        <Child key={el._id} data={el} index={index} />
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

const Child = ({data, index}: {data: INewsApi, index: number}) => {
    const {onRemoveData, onUpdateData} = useContext(Context);

    const [on, setOn] = useState<"name" | "button" | "image" | "">("");

    const {values, onChange, onSubmit, loading, onSetValue} = useForm(data, callback);

    async function callback(){
        try{
            const response = await api.patch("/news", values);
            onUpdateData(response.data.data)
        } catch(err){
            console.log(err);
        }
    };

    const onUploadImage = async (blob: any) => {
        const urls: string[] = [];
        for(let i = 0; i < blob.length; i++){
            const {url} = await upload(blob[i]);
            urls.push(url);
        };
        const updatedImages = [...values.images, ...urls];
        onSetValue({images: updatedImages});
        values.images = updatedImages;
        await api.patch("/news", values)
    };

    const onDeleteImage = async (cid: string, index: number) => {
        await remove(cid);
        const removedImage = values.images.filter((el, i) => index !== i);
        values.images = removedImage;
        onSetValue({images: removedImage});
        await api.patch("/news", values);
    };

    const onDeleteList = async () => {
        await api.delete(`/news/${data._id}`);
        onRemoveData(data);
    };
    
    return(
        <div className={styles.child}>

                <div className={styles.information}>
                    <div className={styles.left}>
                        <button className={styles.description} onClick={() => setOn("name")}>
                            <p>{values.description}</p>
                        </button>
                        <button className={styles.button} type="button" onClick={() => setOn("button")}>
                            {values.button.name || "link"}
                        </button>
                    </div>
                    <div className={styles.right} onClick={() => setOn("image")}>
                        <img src={values.images[0]} alt="THENAILIST" />
                    </div>
                </div>


            {on === "name" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "600px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Button label1="Delete List" warning color="red" onClick={onDeleteList} />

                            <Line />

                            <Textarea placeholder="description <h><p><small>" name="description" value={values.description} onChange={onChange} style={{"height": "300px"}} />
            
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

            {on === "image" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "600px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <File 
                            id={values._id}
                            src={values.images}
                            onUpload={onUploadImage}
                            onDelete={onDeleteImage}
                        />
                    </Container>
                </Cover>
            }

            {on === "button" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "600px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <header>
                                <h2>{index+1}.</h2>
                            </header>

                            <Line />

                            <Input label1="Name of button" name="button.name" value={values.button.name} onChange={onChange} />

                            <Input label1="Href / Link" name="button.href" value={values.button.href} onChange={onChange} />
            
                            <Button label1="update" type="submit" loading={loading} color="black" />
                        </form>
                    </Container>
                </Cover>
            }

        </div>
    )
}