import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import AddTransaction from "./pages/AddTransaction";
import History from "./pages/History";
import Settings from "./pages/Settings";

import BottomNav from "./Components/BottomNav";

function App() {
  const [page, setPage] = useState("home");

  const [transactions, setTransactions] = useState(() => {
  const savedTransactions = localStorage.getItem("transactions");
  return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const addTransaction = (transaction) => {
    setTransactions((current) => [...current, transaction]);
    setPage("home");
  };

  const deleteTransactions = (ids) => {
    setTransactions((current) =>
      current.filter((transaction) => !ids.includes(transaction.id))
    );
  };

  useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
  }, [transactions]);

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

      {page === "history" && (
        <History
          transactions={transactions}
          deleteTransactions={deleteTransactions}
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