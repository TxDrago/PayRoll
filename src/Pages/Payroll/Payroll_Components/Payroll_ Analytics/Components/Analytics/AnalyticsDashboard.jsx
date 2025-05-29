import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const departmentData = [
  { name: 'Engineering', value: 30 },
  { name: 'Product', value: 25 },
  { name: 'Sales', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Operations', value: 10 },
];

const locationData = [
  { name: 'Bangalore', value: 30 },
  { name: 'Mumbai', value: 25 },
  { name: 'Indore', value: 20 },
  { name: 'Delhi', value: 15 },
  { name: 'Dubai', value: 10 },
];

const COLORS = ['#00B2FF', '#A6E3E9', '#FFD166', '#EF476F', '#BDBDBD'];

const AnalyticsDashboard = () => {
  const [year, setYear] = useState('2025-26');

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h2 className="text-lg font-medium font-poppins">Pay Group: Analytics</h2>

{/* statistics Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className=" !shadow-md !rounded-[12px] !border-1 !border-gray-200 !h-fit">
          <CardContent className='!p-3 '>
            <p className="text-sm mb-6 font-poppins">Last Salary Processed</p>
            <p className="text-red-500  text-sm  font-poppins">INR</p>
            <div className='flex gap-1 justify-between'>
            <p className="text-red-500  text-sm  font-poppins">53,02,225</p>
            <p className="text-xs text-gray-400  font-poppins">20/23</p>
            </div>
          </CardContent>
        </Card>
        
         <Card className=" !shadow-md !rounded-[12px] !border-1 !border-gray-200 !h-fit">
          <CardContent className='!p-3 '>
            <p className="text-sm mb-6 font-poppins">Upcoming Salary</p>
            <p className="text-red-500  text-sm  font-poppins">INR</p>
            <div className='flex gap-1 justify-between'>
            <p className="text-red-500  text-sm  font-poppins">53,02,225</p>
            <p className="text-xs text-gray-400  font-poppins">20/23</p>
            </div>
          </CardContent>
        </Card>

        <Card className=" !shadow-md !rounded-[12px] !border-1 !border-gray-200 !h-fit">
          <CardContent className='!p-3 '>
            <p className="text-sm mb-6 font-poppins">Upcoming Reviews (M+1 to M+3)</p>
             <div className='flex gap-1 justify-between items-end'>
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#A7F9FF] rounded-full text-sm font-bold  font-poppins" >
            <span>1</span>
              </div>
            <p className="text-xs text-gray-400 font-poppins">Value: 5 INR lakhs</p>
             </div>
          </CardContent>
        </Card>

          <Card className=" !shadow-md !rounded-[12px] !border-1 !border-gray-200 !h-fit">
          <CardContent className='!p-3 '>
            <p className="text-sm mb-6 font-poppins">Upcoming Reviews (M+1 to M+3)</p>
             <div className='flex gap-1 justify-between items-end'>
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#A7F9FF] rounded-full text-sm font-bold  font-poppins" >
            <span>24</span>
              </div>
            <p className="text-xs text-gray-400 font-poppins">Value: 5 INR lakhs</p>
             </div>
          </CardContent>
        </Card>

      </div>

{/* Pie Chart Container */}
      <Card className="!shadow-md !rounded-xl">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold font-poppins">Compensation Summary</h3>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              variant="outlined"
              size="small"
              className="bg-white !rounded-3xl"
            >
              <MenuItem value="2024-25">Financial Year 2024-25</MenuItem>
              <MenuItem value="2025-26">Financial Year 2025-26</MenuItem>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className='border border-gray-200 rounded-2xl shadow-xl p-2'>
              <h4 className="text-sm mb-2 font-medium font-poppins">Compensation Distribution by Department/Sub-Department</h4>
              
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-2 space-y-1 text-sm">
                {departmentData.map((item, idx) => (
                  <li key={item.name} className="flex items-center">
                    <span className="w-3 h-3 mr-2 inline-block rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                    {item.name} ( % )
                  </li>
                ))}
              </ul>
            </div>

            <div  className='border border-gray-200 rounded-2xl shadow-xl p-2'>
              <h4 className="text-sm mb-2 font-medium font-poppins">Compensation Distribution by Location</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-2 space-y-1 text-sm">
                {locationData.map((item, idx) => (
                  <li key={item.name} className="flex items-center">
                    <span className="w-3 h-3 mr-2 inline-block rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                    {item.name} ( % )
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;



                

