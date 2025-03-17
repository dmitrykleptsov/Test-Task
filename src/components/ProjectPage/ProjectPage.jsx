import React from 'react'

import styles from './styles.module.scss'

const ProjectPage = () => {
	return (
		<div className={styles.project_page}>
			<div className={styles.project_header}>Строительно-монтажные работы</div>
			<div className={styles.list}>
				<div className={styles.list_header}>
					<div className={styles.type}>Уровень</div>
					<div className={styles.type}>Наименование работ</div>
					<div className={styles.type}>Основная з/п</div>
					<div className={styles.type}>Оборудование</div>
					<div className={styles.type}>Накладные расходы</div>
					<div className={styles.type}>Сметная прибыль</div>
				</div>
				<div className={styles.jobs}>
					<div className={styles.jobs_name}>
						<div className={styles.jobs_type}>Южная строительная площадка</div>
						<div className={styles.jobs_type}>Фундаментальные работы</div>
						<div className={styles.jobs_type}>Статья работы №1</div>
						<div className={styles.jobs_type}>Статья работы №2</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectPage
