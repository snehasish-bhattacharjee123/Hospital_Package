// import React from "react";
// import { Check, X } from "lucide-react";

// export function Table({ columns, data }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             {columns.map((column) => (
//               <th
//                 key={column.key}
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 {column.label}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {data.map((row, index) => (
//             <tr key={index}>
//               {columns.map((column) => (
//                 <td key={column.key} className="px-6 py-4 whitespace-nowrap">
//                   {column.render
//                     ? column.render(row[column.key], row)
//                     : row[column.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export const StatusCell = ({ value }) => (
//   <span
//     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//       value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//     }`}
//   >
//     {value ? <Check size={16} /> : <X size={16} />}
//   </span>
// );

import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            {columns.map((column, colIndex) => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wide 
                  ${colIndex === 0 ? "rounded-tl-lg" : ""} 
                  ${colIndex === columns.length - 1 ? "rounded-tr-lg" : ""}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
              className="transition-colors duration-150"
            >
              {columns.map((column) => (
                <td 
                  key={column.key} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  <div className="flex items-center">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </div>
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="bg-white py-12 text-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
}

export const StatusCell = ({ value }) => (
  <motion.span
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
      ${value 
        ? "bg-green-50 text-green-700 border border-green-100" 
        : "bg-red-50 text-red-700 border border-red-100"
      }`}
  >
    {value ? (
      <>
        <Check size={16} className="mr-1.5 text-green-500" />
        Active
      </>
    ) : (
      <>
        <X size={16} className="mr-1.5 text-red-500" />
        Inactive
      </>
    )}
  </motion.span>
);