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
    const {onRemoveData} = useContext(Context);

    const [openButtonEdit, setOpenButtonEdit] = useState(false);

    const {values, onChange, onSubmit, edited, loading, onSetValue} = useForm(data, callback);

    async function callback(){
        await api.patch("/news", values)
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

    const onDeleteNews = async () => {
        await api.delete(`/news/${data._id}`);
        onRemoveData(data);
    };
    
    return(
        <div className={styles.child}>

                <div className={styles.header}>
                    <div>
                        <p>{index+1}.</p>
                    </div>

                    <div className={styles.delete} onClick={onDeleteNews}>
                        <button>Remove</button>
                    </div>
                </div>

                <form className={styles.description} onSubmit={onSubmit}>
                    <textarea
                        name="description"
                        value={values.description}
                        onChange={onChange}
                    />
                    {edited && <Button label1="save" type="submit" color="black" />}

                    <button className={styles.button} type="button" onClick={() => setOpenButtonEdit(true)}>{values.button.name || "link"}</button>
                </form>

                <div className={styles.images}>
                    <File 
                        id={values._id}
                        src={values.images}
                        onUpload={onUploadImage}
                        onDelete={onDeleteImage}
                    />
                </div>

            {openButtonEdit &&
                <Cover onClose={() => setOpenButtonEdit(false)}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
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