import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/auth-layout/index.jsx";
import GuestLayout from "./layouts/guest-layout/index.jsx";
import { AuthContextProvider } from "./contexts/auth-context.jsx";

// Core pages
import NotFound from "./components/error/404.jsx";
import Login from "./components/login-form/index.jsx";
import Logout from "./components/logout/index.jsx";
import Profile from "./components/profile/index.jsx";
import Registration from "./components/registration-form/index.jsx";
import Landing from "./components/landing-pg/index.jsx";
import User from "./components/user/index.jsx";
import MemberManager from "./components/member/MemberManager.jsx";
import Book from "./components/book/index.jsx";
import Transactions from "./components/Transaction/Transactions.jsx";

// Quick action forms
import AddMemberForm from "./components/member/AddMemberForm.jsx";
import AddBookForm from "./components/AddBookForm/index.jsx";

import "./index.css";

function MainApp() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Authenticated routes */}
          <Route path="admin" element={<AuthLayout />}>
            <Route path="user" element={<User />} />
            <Route path="book" element={<Book />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
            <Route path="member" element={<MemberManager />} />{" "}
            <Route path="transactions" element={<Transactions />} />
            <Route path="add-member" element={<AddMemberForm />} />{" "}
            <Route path="add-book" element={<AddBookForm />} />
          </Route>

          {/* Guest routes */}
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
);
