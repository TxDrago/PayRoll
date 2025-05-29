import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const cards = [
  {
    title: 'Outstanding Principal Balance',
    amount: 'INR 1,35,00,000',
    color: 'bg-gradient-to-r from-purple-400 to-purple-500',
  },
  {
    title: 'Outstanding Principal Balance',
    amount: 'INR 45,56,250',
    subtitle: 'Per Month',
    color: 'bg-gradient-to-r from-pink-400 to-pink-500',
  },
  {
    title: 'Ongoing Loans',
    amount: '27',
    subtitle: 'TOTAL LOAN(S) ISSUED: 28',
    color: 'bg-gradient-to-r from-blue-400 to-blue-500',
  },
  {
    title: 'Total Loan Amount Issued',
    amount: 'INR 1,40,00,000',
    color: 'bg-gradient-to-r from-orange-400 to-orange-500',
  },
];

const Loans = () => {
  return (
    <Box className="p-6">
      {/* Heading */}
      <Box className="flex justify-between items-center mb-6">
        <Box>
          <Typography className="font-poppins font-semibold text-lg">Loans</Typography>
          <Typography className="font-poppins text-sm text-gray-500">Bring in the customer for your loans</Typography>
        </Box>
        <Box className="flex gap-3">
          <Button
            variant="outlined"
            className="!font-poppins !rounded-lg !text-sm !normal-case"
          >
            Import
          </Button>
          <Button
            variant="contained"
            className="!font-poppins !rounded-lg !bg-[#003049] !text-white !text-sm !normal-case hover:bg-[#00263b]"
          >
            Add New Loan
          </Button>
        </Box>
      </Box>

      {/* Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Box
            key={index}
            className="rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between relative"
          >
            <Typography className="font-poppins font-medium text-sm text-gray-500 mb-2">
              {card.title}
            </Typography>
            <Typography className="font-poppins font-semibold text-lg">
              {card.amount}
            </Typography>
            {card.subtitle && (
              <Typography className="font-poppins text-xs text-gray-400 mt-1">
                {card.subtitle}
              </Typography>
            )}
            <Box className={`absolute bottom-0 left-0 h-[4px] w-full ${card.color} rounded-b-xl`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Loans;
