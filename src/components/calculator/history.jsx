import React, { useEffect } from "react";

function History({ history, deleteHistory }) {
  useEffect(() => {
    console.log(history);
  });
  return (
    <>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              FirstNumber
            </th>
            <th scope="col" class="px-6 py-3">
              SecondNumber
            </th>
            <th scope="col" class="px-6 py-3">
              Operation
            </th>
            <th scope="col" class="px-6 py-3">
              Result
            </th>
            <th scope="col" class="px-6 ps-12">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((hito, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className=" py-4 ps-14">{hito.firstNumber}</td>
                <td className="ps-16 py-4">{hito.secondNumber}</td>
                <td className="ps-14 py-4">{hito.operation}</td>
                <td className="ps-10 py-4">{hito.result}</td>
                <td className="ps-10 py-4">
                  <button
                    className="btn border-2 px-6 py-2 rounded-md me-6"
                    onClick={() => deleteHistory(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default History;
