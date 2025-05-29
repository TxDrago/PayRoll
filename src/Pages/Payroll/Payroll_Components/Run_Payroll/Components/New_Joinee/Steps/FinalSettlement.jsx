import React from "react";

// ---------------- Local Import ---------------
import FullAndFinal from "./FinalSettlementComponent/FullAndFinal";
import PendingExit from "./FinalSettlementComponent/PendingExit";

// Main Component
const FinalSettlement = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-poppins">
          Employees whose exit has been approved and are serving notice period
          will be shown under ‘Employee in Exit Process’. If there are any exit
          requests that are yet to be approved but last working date fails under
          this motnh (based on the notice period assigned) will be shown under
          ‘Pending Exit Requests’.
        </div>
      </div>

      {/* Table & Actions */}
      <div className="flex flex-col gap-16">
        <div>
          <FullAndFinal />
        </div>
        <div>
          {/* <PendingExit /> */}
        </div>
      </div>
    </div>
  );
};

export default FinalSettlement;
