// src/components/Footer.tsx

import React from 'react';
import styles from './Footer.module.css'; // CSS Module para estilização

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {currentYear} E-commerce. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
