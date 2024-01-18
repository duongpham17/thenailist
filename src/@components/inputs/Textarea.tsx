import styles from './Textarea.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    color?: "black",
    label1?: string | number, 
    label2?: any,
    error?: boolean,
    smallLabelColor?: "red" | "none",
};

const Textarea = ({color, label1, label2, error, smallLabelColor = "none", ...props}:Props) => {
  return (
    <div className={styles.container}>

        {label1 && !label2 && 
            <label className={styles.single}>
                <span>{label1}</span>
            </label>
        }

        {label1 && label2 && 
            <label className={styles.double}> 
                <span>{label1}</span>
                <small className={`${styles[smallLabelColor]}`}>{label2}</small>
            </label>
        }

        <textarea {...props} className={`${styles[color ? color : "plain"]} ${error ? styles.error : ""}`} />

    </div>
  )
}

export default Textarea