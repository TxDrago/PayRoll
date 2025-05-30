import React,{useState} from "react";
import { Box,Typography, Modal,
  Fade } from "@mui/material";
  
  // -------------- Icons -----------------
  import {CloseSquare} from "iconsax-react";

  //---------------- Local Imports ------------------
import LoansTabs from "./Components/LoansTabs";
import Loan_Modal_Table from "./Components/Loan_Import_Modal/Loan_Modal_Table";



const cards = [
  {
    title: "Outstanding Principal Balance",
    amount: "INR 1,35,00,000",
    color: "bg-gradient-to-r from-purple-400 to-purple-500",
  },
  {
    title: "Outstanding Principal Balance",
    amount: "INR 45,56,250",
    subtitle: "Per Month",
    color: "bg-gradient-to-r from-pink-400 to-pink-500",
  },
  {
    title: "Ongoing Loans",
    amount: "27",
    subtitle: "TOTAL LOAN(S) ISSUED: 28",
    color: "bg-gradient-to-r from-blue-400 to-blue-500",
  },
  {
    title: "Total Loan Amount Issued",
    amount: "INR 1,40,00,000",
    color: "bg-gradient-to-r from-orange-400 to-orange-500",
  },
];

const Loans = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
    //---------------------------- Modal Open Button------------------------------------------------
    const handleModal = () => {
      setModalOpen(true);
    };
  
    //---------------------------- Modal Close Button------------------------------------------------
    const handleClose = () => setModalOpen(false);
  
  return (
    <Box className="flex flex-col gap-10">

        {/* Top Part */}
        <Box className="flex flex-col gap-6">

      {/* Heading */}
      <Box className="flex justify-between items-center  gap-3">
        <Box className="flex flex-col gap-1.5">
          <Typography className="!font-poppins !font-semibold !text-lg">
            Loans
          </Typography>
          <Typography className="font-poppins !text-[16px] text-[#818181]">
            Bring in the customer for your loans
          </Typography>
        </Box>
        <Box className="flex gap-4">
          <button
         
          className="!font-poppins !rounded-lg !text-sm !normal-case px-6 py-3 border-2 border-[#005377] cursor-pointer">
            Import
          </button>
          <button 
           onClick={handleModal}
          className="!font-poppins !rounded-lg !bg-[#003049] !text-white !text-sm !normal-case hover:bg-[#00263b] px-6 py-3 cursor-pointer">
            Add New Loan
          </button>
        </Box>
      </Box>

      {/* Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Box
            key={index}
            className="rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col relative min-h-[150px] min-w-[250px]"
          >
            <Typography className="!font-poppins !font-medium !text-sm !text-black !mb-2.5">
              {card.title}
            </Typography>
            <Typography className="!font-poppins !font-medium !text-xl !text-black">
              {card.amount}
            </Typography>
            {card.subtitle && (
              <Typography className="!font-poppins !text-am !text-[#818181] !mt-1">
                {card.subtitle}
              </Typography>
            )}
            <Box
              className={`absolute h-2.5 bottom-0 left-0  w-full ${card.color} rounded-b-xl`}
            />
          </Box>
        ))}
      </Box>
        </Box>

        {/* Loans Tabs part */}

        <LoansTabs />

              {/* ----------------------------  Modal -------------------------- */}

      <Modal open={modalOpen} onClose={handleClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <div className="absolute left-1/2 top-1/2 max-h-[90vh] overflow-y-auto w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-6 py-4 focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between rounded-md bg-white py-2 text-[#000000]">
              <Typography className="font-medium !text-[16px]">
                Import Previous Adhoc Payments
              </Typography>
              <CloseSquare
                color="#19396F"
                className="cursor-pointer"
                onClick={handleClose}
                size="24"
              />
            </div>

            {/* Body */}
            <div className="py-2">
              <Loan_Modal_Table />
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-md border border-[#005377] px-6 py-3 text-sm font-medium text-[#19396F] font-poppins cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-[#005377] px-6 py-3 text-sm font-medium text-white font-poppins cursor-pointer"
                onClick={() => {
                  // Add confirm logic here
                  handleClose();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Fade>
      </Modal>

    </Box>
  );
};

export default Loans;
