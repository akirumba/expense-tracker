import { useState } from "react";

function History({ transactions, deleteTransactions }) {
  const [filter, setFilter] = useState("all");
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pressTimer, setPressTimer] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.type === filter
        );
  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }

      groups[monthKey].push(transaction);

      return groups;
    },
    {}
  );

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const formatMonth = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handlePressStart = (id) => {
    const timer = setTimeout(() => {
      setIsSelecting(true);
      setSelectedIds([id]);
    }, 500);

    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  };

  const cancelSelection = () => {
    setIsSelecting(false);
    setSelectedIds([]);
  };

  const handleDelete = () => {
  if (selectedIds.length === 0) {
    return;
  }

  setShowDeletePopup(true);
};

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">

      <div className="mb-6 flex items-center justify-between">
        {isSelecting ? (
          <>
            <button
              onClick={cancelSelection}
              className="font-medium text-gray-600"
            >
              Cancel
            </button>

            <h1 className="text-xl font-bold text-gray-900">
              {selectedIds.length} Selected
            </h1>

            <button
              onClick={handleDelete}
              className="font-medium text-red-500"
            >
              Delete
            </button>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-gray-900">
            History
          </h1>
        )}
      </div>

      {!isSelecting && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 rounded-lg py-2 font-medium ${
              filter === "all"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`flex-1 rounded-lg py-2 font-medium ${
              filter === "expense"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Expense
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`flex-1 rounded-lg py-2 font-medium ${
              filter === "income"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Income
          </button>
        </div>
      )}

        <div className="space-y-6">
        {filteredTransactions.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-500">
            No transactions
          </div>
        ) : (
          Object.keys(groupedTransactions)
            .sort((a, b) => b.localeCompare(a))
            .map((monthKey) => (
              <div key={monthKey} className="space-y-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {formatMonth(monthKey)}
                </h2>

                {groupedTransactions[monthKey]
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.date) - new Date(a.date)
                  )
                  .map((transaction) => {
                    const isSelected = selectedIds.includes(
                      transaction.id
                    );

                    return (
                      <div
                        key={transaction.id}
                        onPointerDown={() => {
                          if (isSelecting) {
                            toggleSelect(transaction.id);
                          } else {
                            handlePressStart(transaction.id);
                          }
                        }}
                        onPointerUp={handlePressEnd}
                        onPointerLeave={handlePressEnd}
                        onContextMenu={(e) => e.preventDefault()}
                        className={`cursor-pointer rounded-xl bg-white p-4 shadow-sm ${
                          isSelected ? "ring-2 ring-orange-500" : ""
                        }`}
                      >
                        <p className="mb-2 text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isSelecting && (
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded border ${
                                  isSelected
                                    ? "border-orange-500 bg-orange-500"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <span className="text-sm text-white">
                                    ✓
                                  </span>
                                )}
                              </div>
                            )}

                            <div>
                              <p className="font-medium text-gray-900">
                                {transaction.category || transaction.type}
                              </p>

                              {transaction.remark && (
                                <p className="text-sm text-gray-500">
                                  {transaction.remark}
                                </p>
                              )}
                            </div>
                          </div>

                          <p
                            className={`font-semibold ${
                              transaction.type === "expense"
                                ? "text-orange-500"
                                : "text-blue-500"
                            }`}
                          >
                            {transaction.type === "expense" ? "-" : "+"}
                            ฿{transaction.amount}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))
        )}
      </div>

      {showDeletePopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-lg font-bold text-gray-900">
        Delete transaction?
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Are you sure you want to delete {selectedIds.length} selected transaction
        {selectedIds.length > 1 ? "s" : ""}?
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setShowDeletePopup(false)}
          className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            deleteTransactions(selectedIds);
            setShowDeletePopup(false);
            cancelSelection();
          }}
          className="flex-1 rounded-xl bg-red-500 py-3 font-medium text-white"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default History;