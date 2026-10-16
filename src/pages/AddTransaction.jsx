import { useState } from "react";

const DEFAULT_CATEGORIES = {
  expense: ["Food", "Transportation", "Shopping", "Others"],
  income: ["Salary", "Others"],
};

const DEFAULT_PARTIES = {
  expense: ["Cash"],
  income: ["Cash"],
};

function loadOptions(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function AddTransaction({ addTransaction, setPage }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [party, setParty] = useState("Cash");

  const [customCategories, setCustomCategories] = useState(() =>
    loadOptions("expenseTrackerCategories", DEFAULT_CATEGORIES)
  );

  const [partyOptions, setPartyOptions] = useState(() =>
    loadOptions("expenseTrackerParties", DEFAULT_PARTIES)
  );

  const [popupType, setPopupType] = useState("");
  const [newOption, setNewOption] = useState("");

  const categories = customCategories[type] || [];
  const parties = partyOptions[type] || [];

  const partyLabel =
    type === "expense" ? "Paid by" : "Received from";

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory("");
    setParty("");
  };

  const openPopup = (kind) => {
    setNewOption("");
    setPopupType(kind);
  };

  const handleAddOption = () => {
    const value = newOption.trim();

    if (!value) return;

    if (popupType === "category") {
      if (
        categories.some(
          (item) => item.toLowerCase() === value.toLowerCase()
        )
      ) {
        alert("This category already exists.");
        return;
      }

      const updated = {
        ...customCategories,
        [type]: [...categories, value],
      };

      setCustomCategories(updated);
      localStorage.setItem(
        "expenseTrackerCategories",
        JSON.stringify(updated)
      );
      setCategory(value);
    }

    if (popupType === "party") {
      if (
        parties.some(
          (item) => item.toLowerCase() === value.toLowerCase()
        )
      ) {
        alert("This option already exists.");
        return;
      }

      const updated = {
        ...partyOptions,
        [type]: [...parties, value],
      };

      setPartyOptions(updated);
      localStorage.setItem(
        "expenseTrackerParties",
        JSON.stringify(updated)
      );
      setParty(value);
    }

    setNewOption("");
    setPopupType("");
  };

  const handleSave = () => {
    const numericAmount = Number(amount);

    if (
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: numericAmount,
      paidBy: type === "expense" ? party : "",
      receivedFrom: type === "income" ? party : "",
      remark: remark.trim(),
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">
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

        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm outline-none"
          >
            <option value="">None</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => openPopup("category")}
            aria-label="Add category"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-medium text-orange-500 shadow-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Paid by / Received from */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {partyLabel}
        </label>

        <div className="flex gap-2">
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm outline-none"
          >
            <option value="">None</option>

            {parties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => openPopup("party")}
            aria-label={`Add ${partyLabel}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-medium text-orange-500 shadow-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Amount
        </label>

        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setAmount(value);
            }
          }}
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

      {/* Save / Cancel */}
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

      {/* Add option popup */}
      {popupType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
          onClick={() => setPopupType("")}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="popup-title"
              className="mb-4 text-lg font-bold text-gray-900"
            >
              {popupType === "category"
                ? "Add Category"
                : `Add ${partyLabel}`}
            </h2>

            <input
              type="text"
              autoFocus
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddOption();
              }}
              placeholder={
                popupType === "category"
                  ? "Enter category name"
                  : `Enter ${partyLabel.toLowerCase()}`
              }
              className="mb-4 w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setPopupType("")}
                className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleAddOption}
                className="flex-1 rounded-xl bg-orange-500 py-3 font-medium text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTransaction;