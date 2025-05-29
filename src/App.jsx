import React from 'react';
import Payroll from './Pages/Payroll';
import LeaveStepper from './Pages/Payroll/Payroll_Components/Run_Payroll/Components/Attendance/LeaveStepper';
import JoineeStepper from './Pages/Payroll/Payroll_Components/Run_Payroll/Components/New_Joinee/JoineeStepper';
import SalaryRevisionStepper from './Pages/Payroll/Payroll_Components/Run_Payroll/Components/Salary_Revision/SalaryRevisionStepper';
import Payment_Deduction_Stepper from './Pages/Payroll/Payroll_Components/Run_Payroll/Components/Payment & Deduction/Payment_Deduction_Stepper';
import Hold_Salaries_Stepper from './Pages/Payroll/Payroll_Components/Run_Payroll/Components/Hold_Salaries/Hold_Salaries_Stepper';
import Payroll_Deduction_Stepper from './Pages/Payroll/Payroll_Components/Run_Payroll/Components/Payroll_Deduction_Override/Payroll_Deduction_Stepper';


function App() {
  return (
    <div >
     <Payroll />
     {/* <LeaveStepper /> */}
     {/* <JoineeStepper /> */}
     {/* <SalaryRevisionStepper /> */}
     {/* <Payment_Deduction_Stepper /> */}
     {/* <Hold_Salaries_Stepper /> */}
     {/* <Payroll_Deduction_Stepper /> */}
    </div>
  );
}

export default App;
