import styles from './Faq.module.scss';
import React, {useState} from 'react';
import {PropsTypes} from 'pages/faq';

const Faq = (props: PropsTypes) => {

    const {faq} = props;

    const AllQuestions = faq.map(el => el.questions.map(x => x)).flat();

    const [results, setResults] = useState<PropsTypes["faq"][0]["questions"] | []>([]);

    const [search, setSearch] = useState("");

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = AllQuestions.filter(el => el.question.includes(value));
        if(!value){
          setResults([])
          setSearch(value);
        } else {
          setSearch(value);
          setResults(filtered);
        }
    };

    console.log(results);

    return (
        <div className={styles.container}>
            <h1>FAQ</h1>

            <div className={styles.search}>

                <form>
                    <input placeholder='Ask a question' value={search} onChange={onSearch} />
                </form>

               {!!results.length && 
                <div className={styles.results}>
                    <h3>Results: {results.length}</h3>
                    {results.map((el, index) => 
                        <div className={styles.item} key={el._id}>
                            <b>{index+1}.</b>
                            <div>
                                <p>{el.question}</p>
                                <p className={styles.answer}>Answer: {el.answer}</p>
                            </div>
                        </div>    
                    )}
                </div>
                }
            </div>

            <div className={styles.map}>
                {faq.map(el => 
                    <div className={styles.element} key={el._id}>
                        <h2>{el.name}</h2>
                        <div className={styles.text}>
                            {el.questions.map((x, index) => 
                                <div className={styles.item} key={x._id}>
                                    <b>{index+1}.</b>
                                    <div>
                                        <p>{x.question}</p>
                                        <p className={styles.answer}>Answer: {x.answer}</p>
                                    </div>
                                </div>  
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Faq