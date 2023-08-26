import styles from './Email.module.scss';
import React, {useState} from 'react';
import axios from 'axios';

import validation from './Valdation';
import useForm from '@hooks/useForm';

import ContainerFlex from '@components/containers/Flex';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Textarea from '@components/textarea/Style1';
import Text from '@components/text/Style1';

const Index = () => {

    const [sent, setSent] = useState(false);

    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        message: "",
        subject: "",
    };
    
    const {onSubmit, values, errors, onChange, onClear} = useForm(initialState, callback, validation);

    function callback(){
        axios.post("/api/contact", values);
        setSent(true);
        setTimeout(() => setSent(false), 10000);
        onClear();
    };

    return (
        <form className={styles.container} onSubmit={onSubmit}>

            <ContainerFlex>
                <Input label1="First Name" label2={errors.first_name || ""} error
                    value={values.first_name} name="first_name" onChange={onChange} 
                />

                <Input label1="Last Name" label2={errors.last_name || ""} error 
                    value={values.last_name} name="last_name" onChange={onChange} 
                />
            </ContainerFlex>

            <Input label1="Email" label2={errors.email || ""} error 
                value={values.email} name="email" onChange={onChange} 
            />

            <Input label1="Subject" label2={errors.subject || ""} error 
                value={values.subject} name="subject" onChange={onChange} 
            />  

            <Textarea label1="Message" label2={errors.message || ""} error 
                value={values.message} name="message" onChange={onChange} 
            />

            <Button value="send" fill/>

            {sent ? <Text value="Email has been sent, thank you!" lineHeight="4rem"/> : ""}

        </form>
    )
}

export default Index