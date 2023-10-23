import styles from './List.module.scss';
import React, {useContext} from 'react';
import {Context} from '../Context';
import {ITeamsApi} from '@database/models/teams';
import {api} from '@database/api';
import {upload, remove} from '@thirdparty/nftstorage';
import useForm from '@hooks/useForm';

import File from './File';
import Input from '@components/inputs/Input';
import Button from '@components/button/Button';
import Round from '@components/button/Round';

import {RiDeleteBin4Line} from 'react-icons/ri'

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

const Child = ({data, index}: {data: ITeamsApi, index: number}) => {
    const {onRemoveData} = useContext(Context);

    const {values, onChange, onSubmit, edited, onSetValue, loading} = useForm(data, callback);

    async function callback(){
        await api.patch("/teams", values)
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
        await api.patch("/teams", values)
    };

    const onDeleteImage = async (cid: string, index: number) => {
        await remove(cid);
        const removedImage = values.images.filter((el, i) => index !== i);
        values.images = removedImage;
        onSetValue({images: removedImage});
        await api.patch("/teams", values);
    };

    const onDeleteNews = async () => {
        await api.delete(`/teams/${data._id}`);
        onRemoveData(data);
    };
    
    return(
        <div className={styles.child}>

            <form className={styles.description} onSubmit={onSubmit}>
                <div className={styles.flex}>
                    <Input placeholder="Name" name="name" value={values.name || ""} onChange={onChange} />
                    <div>
                        <Round label1={<RiDeleteBin4Line/>} type="button" onClick={onDeleteNews} color="red" loading={loading} />
                    </div>
                </div>
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