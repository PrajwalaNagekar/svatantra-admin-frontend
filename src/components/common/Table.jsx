import React from 'react';

const Table = ({ columns = [], data = [], striped = true }) => {
    return (
        <div className="overflow-x-auto shadow-xl border border-gray-100 rounded-2xl bg-white">
            <table className="w-full text-sm text-gray-700 table-auto rounded-xl">
                <thead className="bg-pink-50 text-gray-600 uppercase text-xs tracking-wider">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-5 py-4 text-left">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b transition-all ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'hover:bg-pink-50/40'
                                    }`}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-5 py-3 whitespace-nowrap">
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center px-5 py-6 text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
