import { Routes, Route, Link } from "react-router-dom";
import BorrowBookForm from "./BorrowBookForm";
import ReturnBookForm from "./ReturnBookForm";
import TransactionList from "./TransactionList";

function Transactions() {
  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "25px" }}>
        Manage Transactions
      </h2>
      <Routes>
        <Route path="/" element={<BorrowBookForm />} />
        <Route path="borrow" element={<BorrowBookForm />} />
        <Route path="return" element={<ReturnBookForm />} />
        <Route path="history" element={<TransactionList />} />
      </Routes>
    </div>
  );
}

export default Transactions;
