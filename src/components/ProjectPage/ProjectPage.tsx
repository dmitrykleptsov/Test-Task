import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react'
import cn from 'classnames'

import { createRow, getRows, deleteRow, updateRow } from '../../constants/api/outlay'
import {
	IRowResponse,
	TableHeaderItem,
	EditableRowData,
	TableRowProps,
	TableIconItemProps,
	TableField,
	NumericTableField,
	DisplayValues
} from '../../constants/api/types'

import styles from './styles.module.scss'


export const TABLE_HEADERS: TableHeaderItem[] = [
	{
		name: 'Уровень',
		size: '110px'
	},
	{
		name: 'Наименование работ',
		size: '757px'
	},
	{
		name: 'Основная з/п',
		size: '200px'
	},
	{
		name: 'Оборудование',
		size: '200px'
	},
	{
		name: 'Накладные расходы',
		size: '200px'
	},
	{
		name: 'Сметная прибыль',
		size: '200px'
	},
]



const TableIconItem = memo(({ level, item, length, index, onAddChild, onDelete }: TableIconItemProps) => {
	return (
		<td>
			{level ? <div
				className={cn(styles.line, styles.line_top)}
				style={{ marginLeft: 12 + ((level - 1) * 20) }}
			/> : null}
			{level ? <div
				className={cn(styles.line, styles.line_left)}
				style={{ marginLeft: 12 + ((level - 1) * 20) }}
			/> : null}
			<div
				className={styles.icon_container}
				style={{ marginLeft: 20 * level }}
			>
				<div
					className={styles.icon_level}
					onClick={() => onAddChild(item.id)}
				/>
				<div
					className={styles.icon_trash}
					style={{ marginLeft: 11.5 }}
					onClick={() => onDelete(item.id)}
				/>
			</div>
			{item?.child?.length ? <div
				className={cn(styles.line, styles.line_bottom)}
				style={{ marginLeft: 12 + ((level) * 20) }}
			/> : null}
			{level && !item?.child?.length && length !== index + 1 ? <div
				className={cn(styles.line, styles.line_extension)}
				style={{ marginLeft: 12 + ((level - 1) * 20) }}
			/> : null}
		</td>
	)
});

const TableRow = memo((
	{
		item,
		level,
		index,
		length,
		onAddChild,
		onDelete,
		onUpdate,
		editingRowId,
		setEditingRowId
	}: TableRowProps) => {
	if (!item) {
		return null;
	}

	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<EditableRowData>({
		rowName: item.rowName,
		salary: item.salary,
		equipmentCosts: item.equipmentCosts,
		overheads: item.overheads,
		estimatedProfit: item.estimatedProfit,
		parentId: item.parentId
	});

	const inputRefs = useRef<Record<TableField, HTMLInputElement | null>>({
		rowName: null,
		salary: null,
		equipmentCosts: null,
		overheads: null,
		estimatedProfit: null,
	});

	const formatNumericValue = (value: number, zeroToEmpty: boolean): string => {
		return zeroToEmpty && value === 0 ? '' : value.toString();
	};

	const getDisplayValues = (data: EditableRowData, zeroToEmpty = false): DisplayValues => {
		const numericFields: NumericTableField[] = ['salary', 'equipmentCosts', 'overheads', 'estimatedProfit'];
		return numericFields.reduce((acc, field) => ({
			...acc,
			[field]: formatNumericValue(data[field], zeroToEmpty)
		}), {} as DisplayValues);
	};

	const [displayValues, setDisplayValues] = useState<DisplayValues>(() => getDisplayValues(item));

	const resetToInitialState = () => {
		setIsEditing(false);
		setEditData({
			rowName: item.rowName,
			salary: item.salary,
			equipmentCosts: item.equipmentCosts,
			overheads: item.overheads,
			estimatedProfit: item.estimatedProfit,
			parentId: item.parentId
		});
		setDisplayValues(getDisplayValues(item));
	};

	const handleDoubleClick = (field: TableField) => {
		setIsEditing(true);
		setDisplayValues(getDisplayValues(item, true));
		setTimeout(() => {
			inputRefs.current[field]?.focus();
		}, 0);
	};

	const handleChange = (field: TableField, value: string) => {
		if (field === 'rowName') {
			setEditData(prev => ({ ...prev, [field]: value }));
		} else {
			setDisplayValues(prev => ({ ...prev, [field]: value }));
			setEditData(prev => ({
				...prev,
				[field]: value === '' ? 0 : Number(value)
			}));
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (editData.salary < 0 || editData.equipmentCosts < 0 || editData.overheads < 0 || editData.estimatedProfit < 0) {
				alert("Нельзя вводить отрицательные числа");
				return;
			}

			onUpdate(item.id, {
				...editData,
				rowName: editData.rowName.trim() || 'Пустая строка'
			});
			setIsEditing(false);
		} else if (e.key === 'Escape') {
			resetToInitialState();
		}
	};

	const formatNumberWithSpaces = (value: number): string => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Добавляем пробелы между тысячами
	};

	const getCellValue = (field: TableField) => {
		if (!isEditing) {
			if (field === 'rowName') {
				return item[field].trim() || 'Пустая строка';
			}
			return formatNumberWithSpaces(item[field]) || '0';
		}

		const value = field === 'rowName' ? editData[field] : displayValues[field as NumericTableField];

		return (
			<input
				ref={(item) => (inputRefs.current[field] = item)}
				type={field === 'rowName' ? 'text' : 'number'}
				value={value}
				placeholder={field === 'rowName' ? item.rowName : formatNumericValue(item[field], true)}
				onChange={(e) => handleChange(field, e.target.value)}
				onKeyDown={handleKeyDown}
				className={`${styles.editing}`}
			/>
		);
	};

	const cellFields: TableField[] = ['rowName', 'salary', 'equipmentCosts', 'overheads', 'estimatedProfit'];

	useEffect(() => {
		if (editingRowId === item.id) {
			setIsEditing(true);
			setDisplayValues(getDisplayValues(item, true));
		} else {
			setIsEditing(false);
		}
	}, [editingRowId, item]);

	return (
		<>
			<tr>
				<TableIconItem
					level={level}
					item={item}
					length={length}
					index={index}
					onAddChild={onAddChild}
					onDelete={onDelete}
				/>
				{cellFields.map((field) => (
					<td key={field} onDoubleClick={() => handleDoubleClick(field)}>
						{getCellValue(field)}
					</td>
				))}
			</tr>
			{item.child?.map((child, childIndex) => (
				<TableRow
					key={child.id}
					item={child}
					level={level + 1}
					index={childIndex}
					length={item.child.length}
					onAddChild={onAddChild}
					onDelete={onDelete}
					onUpdate={onUpdate}
					editingRowId={editingRowId}
					setEditingRowId={setEditingRowId}
				/>
			))}
		</>
	);
});

const flattenRows = (rows: IRowResponse[], level: number = 0): IRowResponse[] => {
	return rows.map(row => {
		const children = row.child?.length ? flattenRows(row.child, level + 1) : [];
		return [{ ...row, level }, ...children];
	}).reduce((acc, curr) => acc.concat(curr), []);
};

export default function ProjectPage() {
	const [rows, setRows] = useState<IRowResponse[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [editingRowId, setEditingRowId] = useState<number | null>(null);

	const loadRows = async () => {
		try {
			const data = await getRows();
			setRows(data);
		} catch (err) {
			setError('Ошибка при загрузке данных');
			console.error(err);
		}
	};

	useEffect(() => {
		loadRows();
	}, [loadRows]);

	const handleAddRow = useCallback(async (parentId?: number) => {
		try {
			const newRow = await createRow({
				rowName: '',
				salary: 0,
				equipmentCosts: 0,
				overheads: 0,
				estimatedProfit: 0,
				parentId: parentId !== undefined ? parentId : null
			});
			await loadRows();
			setEditingRowId(newRow.id);
		} catch (err) {
			console.error('Подробная ошибка:', err);
			setError(err instanceof Error ? err.message : 'Ошибка при добавлении строки');
		}
	}, [loadRows]);

	const handleDeleteRow = useCallback(async (rowId: number) => {
		if (isDeleting) return;

		setIsDeleting(true);
		try {
			await deleteRow(rowId);
			await loadRows();
		} catch (err) {
			console.error('Подробная ошибка:', err);
			setError(err instanceof Error ? err.message : 'Ошибка при удалении строки');
		} finally {
			setIsDeleting(false);
		}
	}, [isDeleting, loadRows]);

	const updateRowsTree = useCallback((
		rows: IRowResponse[],
		rowId: number,
		updateFn: (row: IRowResponse) => IRowResponse | null
	): IRowResponse[] => {
		return rows.map(row => {
			if (row.id === rowId) {
				const updatedRow = updateFn(row);
				return updatedRow === null ? null : updatedRow;
			}
			if (row.child?.length) {
				const updatedChildren = updateRowsTree(row.child, rowId, updateFn);
				return {
					...row,
					child: updatedChildren.filter(Boolean) as IRowResponse[]
				};
			}
			return row;
		}).filter(Boolean) as IRowResponse[];
	}, []);

	const handleUpdateRow = useCallback(async (rowId: number, data: EditableRowData) => {
		try {
			await updateRow(rowId, data);
			setEditingRowId(null);
			setRows(prevRows => {
				return updateRowsTree(prevRows, rowId, (row: IRowResponse) => ({
					...row,
					...data
				}));
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Ошибка при обновлении строки');
		}
	}, [updateRowsTree]);

	const flattenedRows = useMemo(() => flattenRows(rows), [rows]);

	useCallback(({ index }: { index: number }) => {
		const row = flattenedRows[index];
		return (
			<div>
				<TableRow
					item={row}
					level={row.level ?? 0}
					index={index}
					length={flattenedRows.length}
					onAddChild={handleAddRow}
					onDelete={handleDeleteRow}
					onUpdate={handleUpdateRow}
					editingRowId={editingRowId}
					setEditingRowId={setEditingRowId}
				/>
			</div>
		);
	}, [flattenedRows, handleAddRow, handleDeleteRow, handleUpdateRow, editingRowId]);

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	return (
		<div className={styles.project_page}>
			<div className={styles.project_header}>
				Строительно-монтажные работы
			</div>
			<div className={styles.table_container}>
				<table style={{ tableLayout: 'fixed', width: '100%' }}>
					<thead>
						<tr>
							{TABLE_HEADERS.map((item, index) =>
								<th key={index} style={{ width: item.size || 'auto' }}>{item.name}</th>
							)}
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 ? (
							<tr>
								<td colSpan={6} className={styles.empty}>
									<div className={styles.icon_container}>
										<div className={styles.icon_level} onClick={() => handleAddRow()} />
										<span className={styles.create_row_text} onClick={() => handleAddRow()}>
											Нажмите для создания новой строки
										</span>
									</div>
								</td>
							</tr>
						) : (
							<TableRow
								item={rows[0]}
								level={0}
								index={0}
								length={rows.length}
								onAddChild={handleAddRow}
								onDelete={handleDeleteRow}
								onUpdate={handleUpdateRow}
								editingRowId={editingRowId}
								setEditingRowId={setEditingRowId}
							/>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}