import styles from './List.module.scss';
import React, {useContext} from 'react';
import {Context} from '../Context';
import {IServicesApi} from '@database/models/services';
import {api} from '@database/api';
import {upload, remove} from '@thirdparty/nftstorage';
import useForm from '@hooks/useForm';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Button from '@components/button/Button';
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

const Child = ({data, index}: {data: IServicesApi, index: number}) => {
    const {onRemoveData, onUpdateData} = useContext(Context);

    const {values, onChange, onSubmit, edited, onSetValue, loading} = useForm(data, callback);

    async function callback(){
        try{
            const response = await api.patch("/services", values);
            onUpdateData(response.data.data)
        } catch(err){
            console.log(err)
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
        await api.patch("/services", values)
    };

    const onDeleteImage = async (cid: string, index: number) => {
        await remove(cid);
        const removedImage = values.images.filter((el, i) => index !== i);
        values.images = removedImage;
        onSetValue({images: removedImage});
        await api.patch("/services", values);
    };

    const onDeleteList = async () => {
        await api.delete(`/services/${data._id}`);
        onRemoveData(data);
    };
    
    return(
        <div className={styles.child}>

                <div className={styles.header}>
                    <div>
                        <p>{index+1}.</p>
                    </div>

                    <div className={styles.delete} onClick={onDeleteList}>
                        <button>Remove</button>
                    </div>
                </div>

                <form className={styles.description} onSubmit={onSubmit}>
                    <Input
                        label1="Href (dropdown for services)"
                        placeholder='Leave empty to ignore from dropdown'
                        name="href"
                        value={values.href || ""}
                        onChange={onChange}
                    />
                    <Input
                        label1="Name"
                        name="name"
                        value={values.name || ""}
                        onChange={onChange}
                    />
                    <Textarea
                        label1="Description"
                        name="description"
                        value={values.description || ""}
                        onChange={onChange}
                    />
                    {edited && <Button label1="save" type="submit" color="black" loading={loading} />}
                </form>

                <div className={styles.images}>
                    <File 
                        id={values._id}
                        src={values.images}
                        onUpload={onUploadImage}
                        onDelete={onDeleteImage}
                    />
                </div>

        </div>
    )
}