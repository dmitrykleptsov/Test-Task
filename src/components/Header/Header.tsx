import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import cn from 'classnames'

import styles from './styles.module.scss'


export const HEADER_MENU = [
	{
		id: 0,
		name: 'Просмотр',
		path: ROUTES.VIEW
	},
	{
		id: 1,
		name: 'Управление',
		path: ROUTES.MANAGE
	}
]

const Header = () => {
	const location = useLocation()

	return (
		<div className={styles.header}>
			<div className={styles.menu_wrapper}>
				<div className={cn(styles.icon, styles.menu)} />
				<div className={cn(styles.icon, styles.back)} />

				{HEADER_MENU.map((item, index) =>
					<Link
						className={cn(styles.view, location.pathname === item.path && styles.underline)}
						key={index}
						to={item.path}
					>
						{item.name}
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
