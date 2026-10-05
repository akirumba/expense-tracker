import { useState } from "react";

function History({ transactions, setTransactions }) {
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.type === filter
        );

  function clearAll() {
    setTransactions([]);
  }

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          History
        </h1>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
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

      {/* Transactions */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            No transactions
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center"
            >
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
          ))
        )}
      </div>

      {/* Clear All */}
      {transactions.length > 0 && (
        <button
          onClick={clearAll}
          className="w-full mt-8 bg-red-500 text-white rounded-xl py-3 font-medium"
        >
          Clear All
        </button>
      )}

    </div>
  );
}

export default History;