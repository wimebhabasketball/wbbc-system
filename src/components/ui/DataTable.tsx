'use client';
import React from 'react';

interface Column {
    header: string;
    accessor: string;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
}

export default function DataTable({ columns, data, onEdit, onDelete }: DataTableProps) {
    if (!data || data.length === 0) {
        return <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">Belum ada data tersedia.</div>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600 font-bold">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4">{col.header}</th>
                        ))}
                        {(onEdit || onDelete) && <th className="px-6 py-4 text-center">Aksi</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 text-gray-800">
                                    {/* Handle status badge khusus */}
                                    {col.accessor === 'role' || col.accessor === 'status' ? (
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${row[col.accessor] === 'admin' ? 'bg-purple-100 text-purple-700' :
                                            row[col.accessor] === 'active' ? 'bg-green-100 text-green-700' :
                                                'bg-gray-200 text-gray-700'
                                            }`}>
                                            {row[col.accessor]}
                                        </span>
                                    ) : (
                                        row[col.accessor]
                                    )}
                                </td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td className="px-6 py-4 text-center space-x-2">
                                    {onEdit && (
                                        <button onClick={() => onEdit(row)} className="text-wbbc-navy hover:text-blue-800 font-medium">Edit</button>
                                    )}
                                    {onDelete && (
                                        <button onClick={() => onDelete(row)} className="text-wbbc-red hover:text-red-800 font-medium">Hapus</button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}