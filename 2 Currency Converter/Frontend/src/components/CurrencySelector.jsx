import currencies from "../util/currencies";

const CurrencySelector = ({ label, value, onchange }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={`currency-${label}`}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        name={`currency-${label}`}
        id={`currency-${label}`}
        value={value}
        onChange={onchange}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-700 shadow-sm bg-white"
      >
        {Object.keys(currencies).map((currency) => (
          <option key={currency} value={currency}>
            {`${currencies[currency].flag} ${currency} - ${currencies[currency].name}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
