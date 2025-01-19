import { useRef, useState } from "react";
import CurrencySelector from "./CurrencySelector";

const CurrencyConverter = () => {
  const amountInput = useRef();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const convertHandler = () => {
    // Validate input fields
    const amount = amountInput.current.value;

    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setConvertedAmount(0);
      return;
    }

    if (fromCurrency === toCurrency) {
      setErrorMessage("Source and target currencies cannot be the same.");
      setConvertedAmount(0);
      return;
    }

    // Reset error message before making the API call
    setErrorMessage("");

    fetch("http://localhost:3000/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        sourceCurrency: fromCurrency,
        targetCurrency: toCurrency,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "failed") {
          setErrorMessage(data.message);
          setConvertedAmount(0);
        } else {
          setConvertedAmount(data.targetAmount);
        }
      })
      .catch(() => {
        setErrorMessage("An error occurred while converting the currency.");
        setConvertedAmount(0);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Currency Converter
      </h1>

      {/* Input and Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Amount Input */}
        <input
          type="number"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-700 shadow-sm"
          placeholder="Enter Amount Here"
          ref={amountInput}
        />

        {/* From Currency Selector */}
        <CurrencySelector
          label="From"
          value={fromCurrency}
          onchange={(event) => setFromCurrency(event.target.value)}
        />

        {/* To Currency Selector */}
        <CurrencySelector
          label="To"
          value={toCurrency}
          onchange={(event) => setToCurrency(event.target.value)}
        />
      </div>

      {/* Convert Button */}
      <div className="text-center mb-8">
        <button
          type="submit"
          onClick={convertHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Convert
        </button>
      </div>

      {/* Output Section */}
      {errorMessage ? (
        <div className="text-center mt-6">
          <p className="text-xl font-bold text-red-600">{errorMessage}</p>
        </div>
      ) : convertedAmount !== 0 ? (
        <div className="text-center mt-6">
          <p className="text-2xl font-bold text-blue-600">
            Converted Amount: {convertedAmount} {toCurrency}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CurrencyConverter;
