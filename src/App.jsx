import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payroll from "./Pages/Payroll";
import LeaveStepper from "./Pages/Payroll/Payroll_Components/Run_Payroll/Components/Attendance/LeaveStepper";
import JoineeStepper from "./Pages/Payroll/Payroll_Components/Run_Payroll/Components/New_Joinee/JoineeStepper";
import SalaryRevisionStepper from "./Pages/Payroll/Payroll_Components/Run_Payroll/Components/Salary_Revision/SalaryRevisionStepper";
import Payment_Deduction_Stepper from "./Pages/Payroll/Payroll_Components/Run_Payroll/Components/Payment & Deduction/Payment_Deduction_Stepper";
import Hold_Salaries_Stepper from "./Pages/Payroll/Payroll_Components/Run_Payroll/Components/Hold_Salaries/Hold_Salaries_Stepper";
import Payroll_Deduction_Stepper from "./Pages/Payroll/Payroll_Components/Run_Payroll/Components/Payroll_Deduction_Override/Payroll_Deduction_Stepper";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Payroll />} />
          <Route path="/payroll/attendance" element={<LeaveStepper />} />
          <Route path="/payroll/onboarding" element={<JoineeStepper />} />
          <Route path="/payroll/compensation" element={<SalaryRevisionStepper />} />
          <Route path="/payroll/adjustments" element={<Payment_Deduction_Stepper />} />
          <Route path="/payroll/arrears" element={<Hold_Salaries_Stepper />} />
          <Route path="/payroll/overrides" element={<Payroll_Deduction_Stepper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
