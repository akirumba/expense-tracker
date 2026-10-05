function BottomNav({ page, setPage }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">

        {/* Menu */}
        <button
          onClick={() => setPage("menu")}
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <span className="text-xl">☰</span>
          <span className="text-xs mt-1">Menu</span>
        </button>

        {/* Add */}
        <button
          onClick={() => setPage("add")}
          className="w-12 h-12 rounded-full bg-orange-500 text-white text-2xl"
        >
          +
        </button>

        {/* Settings */}
        <button
          onClick={() => setPage("settings")}
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <span className="text-xl">⚙</span>
          <span className="text-xs mt-1">Settings</span>
        </button>

      </div>
    </div>
  );
}

export default BottomNav;