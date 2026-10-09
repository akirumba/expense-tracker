
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
        <div className="font-medium text-gray-900">
          Home
        </div>

        <div className="text-sm text-gray-500 mt-1">
          Monthly overview
        </div>
      </button>

      {/* History */}
      <button
        onClick={() => setPage("history")}
        className="w-full bg-white rounded-xl p-4 text-left shadow-sm"
      >
        <div className="font-medium text-gray-900">
          History
        </div>

        <div className="text-sm text-gray-500 mt-1">
          View all transactions
        </div>
      </button>

    </div>
  );
}

export default Menu;