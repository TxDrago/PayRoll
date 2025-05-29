import React from "react";

// ----------------- Local Import --------------
import Advance_Expense from "./Expense_Component/Advance_Expense";
import SalaryComponentClaim from "./Expense_Component/SalaryComponentClaim";


const Expenses = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Import of Both Table */}
  <div>
    <SalaryComponentClaim />
  </div>
  <div>
    <Advance_Expense />
  </div>
    </div>
  );
};

export default Expenses;
