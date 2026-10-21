import React from "react";

import Header from "./components/Header";
import StudentForm from "./components/StudentForm";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="app">

      <Header />

      <StudentForm />

      <Footer />

    </div>
  );
}

export default App;