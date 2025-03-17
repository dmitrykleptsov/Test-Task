import React from 'react'

import styles from './styles.module.scss'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_name}>
                <div className={styles.project_name}>Название проекта</div>
                <div className={styles.abb}>Аббревиатура</div>
            </div>
            <div className={styles.menu}>
                <div className={styles.menu_section}>По проекту</div>
                <div className={styles.menu_section}>Объекты</div>
                <div className={styles.menu_section}>РД</div>
                <div className={styles.menu_section}>МТО</div>
                <div className={styles.menu_section}>СМР</div>
                <div className={styles.menu_section}>График</div>
                <div className={styles.menu_section}>МиМ</div>
                <div className={styles.menu_section}>Рабочие</div>
                <div className={styles.menu_section}>Капвложения</div>
                <div className={styles.menu_section}>Бюджет</div>
                <div className={styles.menu_section}>Финансирование</div>
                <div className={styles.menu_section}>Панорамы</div>
                <div className={styles.menu_section}>Камеры</div>
                <div className={styles.menu_section}>Поручения</div>
                <div className={styles.menu_section}>Контрагенты</div>
            </div>

        </div>
    )
}

export default Navbar
