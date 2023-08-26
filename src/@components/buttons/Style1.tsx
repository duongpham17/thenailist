import styles from './Style1.module.scss';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    value: string,
    color?: "main" | "white" | "dark" | "black",
    padding?: string,
    margin?: string,
    center?: boolean,
    fill?: boolean,
}

const Style1 = ({value, color="main", padding, margin, center, fill, ...props}: Props) => (
    <div className={`${styles.container} ${center ? styles.center : ""} ${fill ? styles.fill : ""}`}>
        <button className={`${styles[color]}`} style={{padding: padding, margin: margin}} {...props}>
            {value}
        </button>
    </div>
)

export default Style1