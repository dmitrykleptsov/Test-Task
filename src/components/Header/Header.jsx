import React from 'react'

import styles from './styles.module.scss'

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header_menu}>
				<div className={styles.menu_esc}>Esc</div>
				<div className={styles.menu_back}>Back</div>
				<div className={styles.menu_view}>Просмотр</div>
				<div className={styles.menu_control}>Управление</div>
			</div>
		</div>
	)
}

export default Header
