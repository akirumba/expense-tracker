import { useState } from "react";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import AddTransaction from "./pages/AddTransaction";
import Settings from "./pages/Settings";

import BottomNav from "./components/BottomNav";

function App() {
  const [page, setPage] = useState("home");

  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      transaction,
    ]);

    setPage("home");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {page === "home" && (
        <Home transactions={transactions} />
      )}

      {page === "menu" && (
        <Menu setPage={setPage} />
      )}

      {page === "add" && (
        <AddTransaction
          addTransaction={addTransaction}
          setPage={setPage}
        />
      )}

      {page === "settings" && (
        <Settings />
      )}

      <BottomNav
        page={page}
        setPage={setPage}
      />

    </div>
  );
}

export default App;