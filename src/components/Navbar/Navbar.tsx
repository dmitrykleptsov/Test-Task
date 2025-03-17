import React from 'react'

import styles from './styles.module.scss'
import { NAW_MENU } from '../../constants/dictionaries/navMenu'


const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_name}>
        <div className={styles.project_name}>Название проекта</div>
        <div className={styles.abb}>Аббревиатура</div>
      </div>
      <div className={styles.menu}>
        {NAW_MENU.map((item, index) =>
          <div
            className={styles.section}
            key={index}
          >
            <div className={styles.icon} />
            {item}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
