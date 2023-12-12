import React, { useState } from "react";

const CurrencyFormatter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState();

  const convertCurrency = () => {
    const euroToDollarRate = 1.08;
    const dollarToEuroRate = 0.93;
    if (fromCurrency === toCurrency) {
      setConvertedAmount(undefined);
    }

    if (fromCurrency === "EUR" && toCurrency === "USD") {
      setConvertedAmount(parseFloat(amount) * euroToDollarRate);
    } else if (fromCurrency === "USD" && toCurrency === "EUR") {
      setConvertedAmount(parseFloat(amount) * dollarToEuroRate);
    }
  };

  return (
    <div className="text-black p-20">
      <div>
        <label className="text-xl">
          Amount:
          <input
            type="number"
            min={0}
            className="border-2 rounded-md ms-4 p-1 "
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div className="mt-4 block">
        <label>
          From:
          <select
            className="border-2 rounded-md ms-4 p-1 "
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="EUR">Euro</option>
            <option value="USD">US Dollar</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          To:
          <select
            className="border-2 rounded-md ms-8 p-1 mt-4 "
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
          </select>
        </label>
      </div>
      <button
        onClick={convertCurrency}
        className="btn rounded-md border-2 py-2 px-4 my-4 hover:bg-cyan-500"
      >
        Convert
      </button>
      {convertedAmount && (
        <p>
          Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyFormatter;
