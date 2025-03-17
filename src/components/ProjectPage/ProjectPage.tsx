import React, { useRef } from 'react'

import styles from './styles.module.scss'
import cn from 'classnames'

export const TABLE_HEADERS = [
	{
		name: 'Уровень',
		size: ''
	},
	{
		name: 'Наименование работ',
		size: ''
	},
	{
		name: 'Основная з/п',
		size: ''
	},
	{
		name: 'Оборудование',
		size: ''
	},
	{
		name: 'Накладные расходы',
		size: ''
	},
	{
		name: 'Сметная прибыль',
		size: ''
	},
]

export const TABLE_DATA = [
	{
		name: 'Южная строительная площадка',
		salary: 20348,
		equipment: 1750,
		overheads: 108.07,
		profit: 1209122.5,
		levels: [
			{
				name: 'Фундаментальные работы',
				salary: 20348,
				equipment: 1750,
				overheads: 108.07,
				profit: 1209122.5,
				levels: [
					{
						name: 'Статья работы № 1',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
					{
						name: 'Статья работы № 2',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
					{
						name: 'Статья работы № 2',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
					{
						name: 'Статья работы № 2',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
				]
			}
		]
	},
	{
		name: 'Южная строительная площадка',
		salary: 20348,
		equipment: 1750,
		overheads: 108.07,
		profit: 1209122.5,
		levels: [
			{
				name: 'Фундаментальные работы',
				salary: 20348,
				equipment: 1750,
				overheads: 108.07,
				profit: 1209122.5,
				levels: [
					{
						name: 'Статья работы № 1',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
					{
						name: 'Статья работы № 2',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
				]
			},
			{
				name: 'Фундаментальные работы',
				salary: 20348,
				equipment: 1750,
				overheads: 108.07,
				profit: 1209122.5,
				levels: [
					{
						name: 'Статья работы № 1',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5
					},
					{
						name: 'Статья работы № 2',
						salary: 20348,
						equipment: 1750,
						overheads: 108.07,
						profit: 1209122.5,
						levels: [
							{
								name: 'Статья работы № 4',
								salary: 20348,
								equipment: 1750,
								overheads: 108.07,
								profit: 1209122.5
							},
							{
								name: 'Статья работы № 5',
								salary: 20348,
								equipment: 1750,
								overheads: 108.07,
								profit: 1209122.5
							},
						]
					},
				]
			}
		]
	},
]

const TableIconItem = ({ level, item, length, index }: { level: number, item: any, length: number, index: number }) => {
	return (
		<td>
			{level ? <div
				className={cn(styles.line, styles.line_top)}
				style={{ marginLeft: 7 + ((level - 1) * 20) }}
			/> : null}
			{level ? <div
				className={cn(styles.line, styles.line_left)}
				style={{ marginLeft: 7 + ((level - 1) * 20) }}
			/> : null}
			<div
				className={styles.icon_level}
				style={{ marginLeft: 20 * level }}
			/>
			{item?.levels ? <div
				className={cn(styles.line, styles.line_bottom)}
				style={{ marginLeft: 7 + ((level) * 20) }}
			/> : null}
			{level && !item?.levels && length !== index + 1 ? <div
				className={cn(styles.line, styles.line_extension)}
				style={{ marginLeft: 7 + ((level - 1) * 20) }}
			/> : null}

		</td>
	)
}

const renderRows = (data: any[], level: number = 0) => {
	return data.map((item, index) => (
		<React.Fragment key={item.name + index}>
			<tr>
				<TableIconItem level={level} item={item} length={data?.length} index={index} />
				<td>{item.name}</td>
				<td>{item.salary}</td>
				<td>{item.equipment}</td>
				<td>{item.overheads}</td>
				<td>{item.profit}</td>
			</tr>
			{item.levels && item.levels.length > 0 && renderRows(item.levels, level + 1)}
		</React.Fragment>
	));
};

const ProjectPage = () => {
	return (
		<div className={styles.project_page}>
			<div className={styles.project_header}>Строительно-монтажные работы</div>

			<table>
				<thead>
					<tr>
						{TABLE_HEADERS.map((item, index) =>
							<th key={index}>{item.name}</th>
						)}
					</tr>
				</thead>
				<tbody>
					{renderRows(TABLE_DATA)}
				</tbody>
			</table>
		</div>
	)
}

export default ProjectPage
