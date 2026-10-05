function Settings() {
  return (
    <div className="min-h-screen bg-gray-100 px-5 py-6 pb-24">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>
      </div>

      {/* Menu Items */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        <button className="flex w-full items-center px-5 py-4 text-left text-gray-800 hover:bg-gray-50">
          Currency
        </button>

        <button className="flex w-full items-center border-t border-gray-100 px-5 py-4 text-left text-gray-800 hover:bg-gray-50">
          Account
        </button>

        <button className="flex w-full items-center border-t border-gray-100 px-5 py-4 text-left text-gray-800 hover:bg-gray-50">
          About
        </button>

      </div>

    </div>
  );
}

export default Settings;