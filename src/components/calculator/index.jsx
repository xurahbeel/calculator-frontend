import React, { useEffect, useState, useCallback } from "react";
import Modal from "./modal";
import History from "./history";
import CurrencyFormatter from "./currency";
import axios from "axios";

function Calculator({ user }) {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [result, setResult] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCurrency, setIsModalCurrency] = useState(false);
  const [history, setHistory] = useState([]);

  const addList = useCallback(() => {
    const headers = {
      Authorization: `Bearer ${user.userToken}`,
    };
    axios
      .post(
        "http://localhost:3001/api/data",
        {
          array: history,
        },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [history, user.userToken]);

  const calculateResult = (operation) => {
    setClickedButton(operation);
    switch (operation) {
      case "+":
        setResult(firstNumber + secondNumber);
        setHistory((prev) => [
          ...prev,
          {
            firstNumber,
            secondNumber,
            operation,
            result: firstNumber + secondNumber,
          },
        ]);
        break;
      case "-":
        setResult(firstNumber - secondNumber);
        setHistory((prev) => [
          ...prev,
          {
            firstNumber,
            secondNumber,
            operation,
            result: firstNumber - secondNumber,
          },
        ]);
        break;
      case "*":
        setResult(firstNumber * secondNumber);
        setHistory((prev) => [
          ...prev,
          {
            firstNumber,
            secondNumber,
            operation,
            result: firstNumber * secondNumber,
          },
        ]);
        break;
      case "/":
        setResult(firstNumber / secondNumber);
        setHistory((prev) => [
          ...prev,
          {
            firstNumber,
            secondNumber,
            operation,
            result: firstNumber / secondNumber,
          },
        ]);
        break;
      default:
        break;
    }
  };

  const deleteHistory = (indexToDelete) => {
    setHistory((prev) =>
      prev.filter((value, index) => indexToDelete !== index)
    );
    addList();
  };

  const getList = () => {
    const headers = {
      Authorization: `Bearer ${user.userToken}`,
    };

    axios
      .get("http://localhost:3001/api/getData", { headers })
      .then((response) => {
        console.log("response.data.array : ", response.data.array);
        setHistory(response.data.array);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    addList();
  }, [history.length, addList]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="border-2 p-48 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {/* heading */}
        <div className=" text-3xl font-bold">
          Hi {user.userName} welcome to My Calculator
        </div>
        {/* input tags */}
        <div className=" mt-24 ">
          <div>
            <label
              htmlFor="num1"
              className="block text-lg text-start leading-6 text-gray-900 mb-1 text-white "
            >
              Enter your first number
            </label>
            <input
              type="number"
              className="w-full text-black ps-2"
              value={String(firstNumber)}
              onChange={(e) => {
                setFirstNumber(Number(e.target.value));
              }}
            />
          </div>

          <div>
            <label
              htmlFor="num2"
              className="block text-lg text-start leading-6 text-gray-900 mt-4 mb-1 text-white "
            >
              Enter your Second number
            </label>
            <input
              type="number"
              className="w-full text-black ps-2"
              value={String(secondNumber)}
              onChange={(e) => {
                setSecondNumber(Number(e.target.value));
              }}
            />
          </div>
        </div>
        {/* buttons */}
        <div className="mt-8 flex ">
          <button
            className={`button border-2 rounded-md px-8 py-2  bg-${
              clickedButton === "+" ? "cyan-500" : ""
            }`}
            onClick={() => calculateResult("+")}
          >
            ADD
          </button>
          <button
            className={`button border-2 rounded-md px-8 py-2  bg-${
              clickedButton === "-" ? "cyan-500" : ""
            } ms-4`}
            onClick={() => calculateResult("-")}
          >
            SUBTRACT
          </button>
          <button
            className={`button border-2 rounded-md px-8 py-2  bg-${
              clickedButton === "*" ? "cyan-500" : ""
            } ms-4`}
            onClick={() => calculateResult("*")}
          >
            MULTIPLY
          </button>
          <button
            className={`button border-2 rounded-md px-8 py-2  bg-${
              clickedButton === "/" ? "cyan-500" : ""
            } ms-4`}
            onClick={() => calculateResult("/")}
          >
            DIVIVDE
          </button>
        </div>
        {/* Result */}
        <div className="flex mt-24 justify-center">
          <p className="mt-2">Result = </p>
          <div className="w-6/12 border-2 rounded-md px-8 py-2 ms-4 ">
            {result}
          </div>
        </div>
        {/* view history */}
        <div className="mt-24 flex justify-between">
          <div
            className="underline text-2xl cursor-pointer hover:text-cyan-500"
            onClick={() => setIsModalOpen(true)}
          >
            View history
          </div>

          <div
            className="underline text-2xl cursor-pointer hover:text-cyan-500"
            onClick={() => setIsModalCurrency(true)}
          >
            Currency Formatter
          </div>
        </div>
      </div>
      {/* Modals */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name="My History"
        >
          <History history={history} deleteHistory={deleteHistory} />
        </Modal>
      )}
      {isModalCurrency && (
        <Modal
          isOpen={isModalCurrency}
          onClose={() => setIsModalCurrency(false)}
          name="Currency Formatter"
        >
          <CurrencyFormatter />
        </Modal>
      )}
    </div>
  );
}

export default Calculator;
