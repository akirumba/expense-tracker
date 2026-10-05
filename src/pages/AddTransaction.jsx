import { useState } from "react";

function AddTransaction({ addTransaction, setPage }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  const categories =
    type === "expense"
      ? ["Food", "Transportation", "Shopping", "Others"]
      : ["Salary", "Others"];

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory("");
  };

  const handleSave = () => {
    if (!amount) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
      remark,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">

      {/* Header */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Add Transaction
      </h1>

      {/* Expense / Income */}
      <div className="mb-6 flex rounded-xl bg-gray-200 p-1">

        <button
          onClick={() => handleTypeChange("expense")}
          className={`flex-1 rounded-lg py-3 font-medium transition ${
            type === "expense"
              ? "bg-white text-orange-500 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Expense
        </button>

        <button
          onClick={() => handleTypeChange("income")}
          className={`flex-1 rounded-lg py-3 font-medium transition ${
            type === "income"
              ? "bg-white text-green-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Income
        </button>

      </div>

      {/* Category */}
      <div className="mb-4">

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm outline-none"
        >
          <option value="">Select category</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Amount */}
      <div className="mb-4">

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Amount
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm outline-none"
        />

      </div>

      {/* Remark */}
      <div className="mb-8">

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Remark
        </label>

        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Optional"
          className="w-full rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm outline-none"
        />

      </div>

      {/* Buttons */}
      <div className="flex gap-3">

        <button
          onClick={handleSave}
          className="flex-1 rounded-xl bg-orange-500 py-3 font-medium text-white"
        >
          Save
        </button>

        <button
          onClick={() => setPage("home")}
          className="flex-1 rounded-xl bg-white py-3 font-medium text-gray-700 shadow-sm"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default AddTransaction;