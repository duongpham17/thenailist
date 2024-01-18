import styles from './Faq.module.scss';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router'
import {PropsTypes} from 'pages/faq';

import useOpen from '@hooks/useOpen';
import {MdArrowRight} from 'react-icons/md';
import {BsDot} from 'react-icons/bs';

const Faq = (props: PropsTypes) => {

    const location = useRouter();

    const {faq} = props;

    const {openItems, onOpenItems} = useOpen({initialState: ""});

    const AllQuestions = faq.map(el => el.questions.map(x => x)).flat();

    const [results, setResults] = useState<PropsTypes["faq"][0]["questions"] | []>([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const idIndex = faq.findIndex(el => el.name.toLowerCase().split(" ").join("").includes(location.asPath.slice(5).toLowerCase()));
        const id = faq[idIndex];
        onOpenItems(id._id);
    }, [])

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = AllQuestions.filter(el => 
           el.question.toLowerCase().includes(value.toLowerCase()) || el.answer.toLowerCase().includes(value.toLowerCase())
        );
        if(!value){
          setResults([])
          setSearch(value);
        } else {
          setSearch(value);
          setResults(filtered);
        }
    };

    return (
        <div className={styles.container}>
            <h1>FIND AN ANSWER</h1>

            <div className={styles.search}>

                <form>
                    <input placeholder='Ask a question' value={search} onChange={onSearch} />
                </form>

               {!!results.length && 
                <div className={styles.results}>
                    <h3>Results: {results.slice(0, 10).length}</h3>
                    {results.slice(0, 10).map((el, index) => 
                        <div className={styles.item} key={el._id}>
                            <b>{index+1}.</b>
                            <div>
                                {el.question && <p>{el.question}</p>}
                                <p className={styles.answer}>{el.answer}</p>
                            </div>
                        </div>    
                    )}
                </div>
                }
            </div>

            <div className={styles.map}>
                {faq.map(el => 
                    <div className={styles.element} key={el._id} id={el.name}>
                        <button onClick={() => onOpenItems(el._id)}>
                            <MdArrowRight className={openItems.includes(el._id) ? styles.open : ""}/>
                            <b>{el.name.toUpperCase()}</b>
                        </button>
                       {openItems.includes(el._id) && 
                            <div className={styles.text}>
                                {el.questions.map((x) => 
                                    <div className={styles.item} key={x._id}>
                                        {x.question && <p className={styles.question}><BsDot/> {x.question}</p>}
                                        <p className={styles.answer}>{x.answer}</p>
                                    </div>  
                                )}
                            </div>
                        }
                    </div>
                )}
            </div>

        </div>
    )
}

export default Faq;
