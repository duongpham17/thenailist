import styles from './List.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {ITeamsApi} from '@database/models/teams';
import {api} from '@database/api';
import {upload, remove} from '@thirdparty/nftstorage';
import useForm from '@hooks/useForm';

import File from './File';
import Line from '@components/line/Style1';
import Container from '@components/containers/Style1';
import Cover from '@components/cover';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Button from '@components/button/Button';

const List = () => {

    const {data, actions} = useContext(Context);

    if(data.length){
        return ( (actions === "")
            ?
                <div className={styles.container}>
                    {data.map((el) => 
                        <Child key={el._id} data={el} />
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

const Child = ({data}: {data: ITeamsApi}) => {

    const [on, setOn] = useState<"image" | "name" | "">("")

    const {onRemoveData} = useContext(Context);

    const {values, onChange, onSubmit, onSetValue, loading, edited} = useForm(data, callback);

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

    const onDeleteList = async () => {
        await api.delete(`/teams/${data._id}`);
        onRemoveData(data);
    };
    
    return(
        <div className={styles.child}>

            <div className={styles.information}>
                <div>
                    <button onClick={() => setOn("image")}><img src={values.images[0]} alt="THENAILIST" /></button>
                    <button onClick={() => setOn("name")}>
                        <b>{values.name || "DOE"}</b>    
                        <p>{values.description}</p>
                    </button>
                    
                </div>
            </div>

            { on === "name" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <form onSubmit={onSubmit}>
                            <Button warning label1={"delete person"} color="red" onClick={onDeleteList}/>

                            <Line />

                            <Input placeholder="Name" name="name" value={values.name || ""} onChange={onChange} />

                            <Textarea placeholder="Description" name="description" value={values.description || ""} onChange={onChange} />
            
                            {edited && <Button label1="update" type="submit" loading={loading} color="black" />}
                        </form>
                    </Container>
                </Cover>
            }

            { on === "image" &&
                <Cover onClose={() => setOn("")}>
                    <Container style={{"maxWidth": "400px", "padding": "1rem"}} onClick={e => e.stopPropagation()}>
                        <File 
                            id={values._id}
                            src={values.images}
                            onUpload={onUploadImage}
                            onDelete={onDeleteImage}
                        />
                    </Container>
                </Cover>
            }

        </div>
    )
}