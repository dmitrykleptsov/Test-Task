import { API_URL, ENTITY_ID } from './constants';
import { IRowData, IRowResponse } from './types';

export const createRow = async (data: IRowData): Promise<IRowResponse> => {
    try {
        const response = await fetch(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rowName: data.rowName,
                salary: Number(data.salary),
                equipmentCosts: Number(data.equipmentCosts),
                overheads: Number(data.overheads),
                estimatedProfit: Number(data.estimatedProfit),
                parentId: data.parentId || null,
                mimExploitation: 0,
                machineOperatorSalary: 0,
                materials: 0,
                mainCosts: 0,
                supportCosts: 0
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при создании строки');
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const getRows = async (): Promise<IRowResponse[]> => {
    try {
        const response = await fetch(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/list`);
        if (!response.ok) {
            const errorText = await response.text(); // Получаем текст ошибки
            console.error('Ошибка при получении строк:', errorText);
            throw new Error('Ошибка при получении строк');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении строк:', error);
        throw error;
    }
};


export const deleteRow = async (rowId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/${rowId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при удалении строки');
        }
    } catch (error) {
        console.error('Ошибка при удалении строки:', error);
        throw error;
    }
};

export const updateRow = async (rowId: number, data: {
    rowName: string;
    salary: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
}): Promise<IRowResponse> => {
    try {
        console.log('Row ID:', rowId); // Логируем ID строки перед обновлением
        const response = await fetch(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/${rowId}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                supportCosts: 0
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при обновлении строки');
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при обновлении строки:', error);
        throw error;
    }
}; 