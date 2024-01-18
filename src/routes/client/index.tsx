import styles from './Client.module.scss';
import React, {useState} from 'react';
import {api} from '@database/api';
import useForm from '@hooks/useForm';
import validation from './validation';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Boolean from '@components/inputs/Boolean';
import Flex from '@components/flex/Style1';
import Button from '@components/button/Button';
import { FaInfoCircle } from "react-icons/fa";
import { medical } from './data';
import Openarrow from '@components/button/Openarrows'
import { MdKeyboardArrowDown } from 'react-icons/md';

const Client = () => {

    const [medicalOpen, setMedicalOpen] = useState(false);
    const [sent, setSent] = useState(false);

    const initialState = {
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        address: "",
        city: "",
        postcode: "",
        medical_history: "",
        marketing: false,
    };

    const {values, onChange, onSubmit, validationErrors, loading, onClear, onSetValue} = useForm(initialState, callback, validation);

    async function callback(){
        const response = await api.post("/client", values);
        if(response) {
            onClear();
            setSent(true);
        }
    };

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <Flex>
                <Input 
                    label1="First Name" 
                    error={validationErrors.first_name}
                    name="first_name" 
                    value={values.first_name} 
                    onChange={onChange}
                />

                <Input 
                    label1="Last Name" 
                    error={validationErrors.last_name} 
                    name="last_name" 
                    value={values.last_name} 
                    onChange={onChange}
                />
            </Flex>

            <Input 
                label1="Date of Birth" 
                type="date"
                error={validationErrors.date_of_birth}
                name="date_of_birth" 
                value={values.date_of_birth} 
                onChange={onChange}
            />

            <Input 
                label1="Email" 
                error={validationErrors.email}
                name="email" 
                value={values.email} 
                onChange={onChange}
            />
                <Input 
                label1="Phone" 
                error={validationErrors.phone}
                name="phone" 
                value={values.phone} 
                onChange={onChange}
            />

            <Input 
                label1="Address" 
                error={validationErrors.last_name} 
                name="address" 
                value={values.address} 
                onChange={onChange}
            />

            <Input 
                label1="City" 
                error={validationErrors.city} 
                name="city" 
                value={values.city} 
                onChange={onChange}
            />

            <Input 
                label1="Postcode" 
                error={validationErrors.postcode} 
                name="postcode" 
                value={values.postcode} 
                onChange={onChange}
            />

            <Textarea 
                label1="Medical History" 
                label2={<a href="/faq#health&medical" rel="noopener noreferrer" target="_blank"><FaInfoCircle /></a>}
                placeholder='Please enter N/A if not applicable'
                error={validationErrors.medical_history}
                name="medical_history" 
                value={values.medical_history} 
                onChange={onChange}
            />

            <div className={styles.medical}>
                <button onClick={() => setMedicalOpen(!medicalOpen)} type="button">
                    <span>Medical Information</span> 
                    <MdKeyboardArrowDown/>
                </button>
                {medicalOpen && <p onClick={e => e.stopPropagation()}>{medical}</p>}
            </div>

            <div className={styles.marketing}>
                <Boolean 
                    value={values.marketing}
                    message="BY CLICKING THE BOX, I AGREE TO RECIEVE EMAIL ABOUT PROMOTIONS AND OFFERS."
                    onClick={() => onSetValue({marketing: !values.marketing})}
                />
            </div>

            {Object.keys(validationErrors).length !== 0 &&
                <div className={styles.errors}>
                    <p>* Missing fields, please fill in the information that are highlighted in red.</p>
                </div>
            }

            <Button 
                label1="submit" 
                type="submit" 
                color='main' 
                loading={loading} 
            />

            {sent &&
                <h3 className={styles.done}>
                    Thank you, information saved.
                </h3>
            }

        </form>
    )
}

export default Client