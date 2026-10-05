function Menu({ setPage }) {
  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Menu
      </h1>

      {/* Home */}
      <button
        onClick={() => setPage("home")}
        className="w-full bg-white rounded-xl p-4 text-left shadow-sm mb-3"
      >
        <div className="text-lg font-semibold text-gray-900">
          Home
        </div>
        <div className="text-sm text-gray-500 mt-1">
          View your expense overview
        </div>
      </button>

      {/* Income */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm mb-3">
        <div className="text-lg font-semibold text-gray-900">
          Income
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Manage your income
        </div>
      </div>

      {/* Expense */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm mb-3">
        <div className="text-lg font-semibold text-gray-900">
          Expense
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Manage your expenses
        </div>
      </div>

      {/* History */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm">
        <div className="text-lg font-semibold text-gray-900">
          History
        </div>
        <div className="text-sm text-gray-500 mt-1">
          View your transaction history
        </div>
      </div>

    </div>
  );
}

export default Menu;