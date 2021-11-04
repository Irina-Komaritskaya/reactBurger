import React from 'react'
import styles from './form.module.css'

interface IFormProps{
    onSubmit(e: React.FormEvent): void,
    children: React.ReactNode
}
export const Form: React.FC<IFormProps> = ({children,  onSubmit}) => {
    return (
        <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </div>
    )
}