import React, { useEffect } from 'react';
import styles from './form.module.css';

interface IFormProps {
  onSubmit(e: React.FormEvent): void;
  children: React.ReactNode;
  idButton?: string;
}
export const Form: React.FC<IFormProps> = ({
  children,
  onSubmit,
  idButton,
}) => {
  useEffect(() => {
    if (idButton) {
      const button = document.getElementById(idButton);
      button?.children[0].setAttribute('type', 'submit');
    }
  }, [idButton]);
  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </div>
  );
};
