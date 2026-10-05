function Home({ transactions }) {

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  const total = income + expenses;

  const expensePercent =
    total === 0 ? 0 : (expenses / total) * 100;

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Expense Tracker
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          October 2026
        </p>
      </div>

      {/* Expenses vs Balance */}
      <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">

        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Expenses vs Balance
        </h2>

        <div className="flex items-center justify-center">

          <div
            className="flex h-40 w-40 items-center justify-center rounded-full"
            style={{
              background:
                total === 0
                  ? "#e5e7eb"
                  : `conic-gradient(
                      #fb923c 0% ${expensePercent}%,
                      #3b82f6 ${expensePercent}% 100%
                    )`,
            }}
          >

            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">

              <span className="text-xs text-gray-500">
                Balance
              </span>

              <span className="mt-1 text-2xl font-bold text-gray-900">
                ฿{balance.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">

        <div className="rounded-2xl bg-white p-4 shadow-sm">

          <p className="text-sm text-gray-500">
            Income
          </p>

          <h2 className="mt-2 text-lg font-bold text-gray-900">
            ฿{income.toLocaleString()}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">

          <p className="text-sm text-gray-500">
            Expenses
          </p>

          <h2 className="mt-2 text-lg font-bold text-gray-900">
            ฿{expenses.toLocaleString()}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Home;