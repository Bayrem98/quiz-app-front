import React from "react";
import "./App.css";
import QuizPage from "./component/pages/QuizPage";
import QuestionsAdminTable from "./component/pages/QuestionsAdminTable";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/admin" element={<QuestionsAdminTable />} />
      </Routes>
    </div>
  );
}

export default App;
