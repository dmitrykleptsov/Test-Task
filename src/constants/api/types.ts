export interface IRowData {
    rowName: string;
    salary: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    parentId?: number | null;
}

export interface EditableRowData {
	rowName: string;
	salary: number;
	equipmentCosts: number;
	overheads: number;
	estimatedProfit: number;
	parentId: number;
}

export interface TableIconItemProps {
	level: number;
	item: IRowResponse;
	length: number;
	index: number;
	onAddChild: (parentId: number) => void;
	onDelete: (rowId: number) => void;
}

export interface TableRowProps {
	item: IRowResponse;
	level: number;
	index: number;
	length: number;
	onAddChild: (parentId: number) => void;
	onDelete: (rowId: number) => void;
	onUpdate: (rowId: number, data: EditableRowData) => void;
	editingRowId: number | null;
	setEditingRowId: (id: number | null) => void;
}

export interface IRowResponse {
    id: number;
    parentId: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    child: IRowResponse[];
    level?: number;
} 

export type TableHeaderItem = {
	name: string;
	size: string;
}

export type TextTableField = 'rowName';
export type NumericTableField = 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit';
export type TableField = TextTableField | NumericTableField;
export type DisplayValues = Record<NumericTableField, string>;