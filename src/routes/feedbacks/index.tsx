import styles from './Feedbacks.module.scss';
import React, {useState} from 'react';
import Link from 'next/link';
import { FaStar } from "react-icons/fa";
import { review_page } from '@data/business';
import useForm from '@hooks/useForm';
import validation from './Validation';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Button from '@components/button/Button';
import api from '@database/api';

const FeedbacksIndex = () => {

  const [star, setStar] = useState(-1);
  const [done, setDone] = useState(false);

  const initialState = {
    name: "",
    email: "",
    feedback: "",
  };

  const {onSubmit, values, onChange, validationErrors, loading} = useForm(initialState, callback, validation);

  async function callback(){
    try{
      await api.post("/feedbacks", values);
      setDone(true);
    } catch(err){
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.review}>
        {done ?
            <div className={styles.done}>
              <h2>Thank you for the feedback, this will help us improve our services.</h2>

            </div>
          :
          <div>
              <h1>Thank you. Please leave us a review to improve our services.</h1>

              <div className={styles.stars}>
                {[0,1,2,3,4].map(el => <FaStar color={star >= el ? "#ffd900" : ""} key={el} onClick={() => setStar(el)}/>)}
              </div>

              {star >= 4 &&
                <div className={styles.google}>
                  <Link href={`${review_page}`}>Click me to review on Google</Link>
                </div>
              }
              {star >= 0 && star <= 3 &&
                  <form className={styles.feedback} onSubmit={onSubmit}>
                    <Input 
                      label1="Email" 
                      name="email" 
                      value={values.email} 
                      onChange={onChange} 
                      error={validationErrors.email}
                    />

                    <Input 
                      label1="Name" 
                      name="name" 
                      value={values.name} 
                      onChange={onChange} 
                      error={validationErrors.name}
                    />

                    <Textarea 
                      label1="Feedback"
                      name="feedback" 
                      placeholder='What can we do to make our services a 5 star.'
                      value={values.feedback} 
                      onChange={onChange} 
                      error={validationErrors.feedback} 
                    />

                    {values.name && values.feedback && values.email && <Button label1="Submit" color="main" type="submit" loading={loading} />}
                </form>
              }
          </div>
        }

      </div>
      
    </div>
  )
}

export default FeedbacksIndex