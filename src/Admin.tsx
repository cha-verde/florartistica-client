import Products from "./Products";
import Dashboard from "./Dashboard";
import { useState } from "react";

function Admin() {
  const [activeTab, setTab] = useState("dashboard");

  return (
    <div className="flex flex-row h-dvh">
      <div className="sidebar p-10 shadow-md">
        <ul className="flex flex-col gap-5">
          <li>florartistica</li>
          <li
            className={`flex flex-row items-center gap-2 p-2 rounded-md ${
              activeTab === "dashboard" ? "bg-sidetab" : ""
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <button
              className="text-lg"
              onClick={() => setTab("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li
            className={`flex flex-row items-center gap-2 p-2 rounded-md
            ${activeTab === "products" ? "bg-sidetab" : ""}
            `}
          >
            <span className="material-symbols-outlined">box</span>
            <button
              className="text-lg"
              onClick={() => setTab("products")}
            >
              Products
            </button>
          </li>
        </ul>
      </div>
      <div className="main w-full">
        {activeTab === "dashboard" && <Dashboard></Dashboard>}
        {activeTab === "products" && <Products></Products>}
      </div>
    </div>
  );
}

export default Admin;
