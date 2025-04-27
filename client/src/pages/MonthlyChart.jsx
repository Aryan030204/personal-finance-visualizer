import React from 'react'
import Chart from '../components/Chart'

const MonthlyChart = () => {
  return (
    <div className='flex flex-col p-10 gap-[5rem] items-center justify-center w-full'>
      <div className='w-full text-center'>
        <h1 className='text-4xl font-bold text-red-500'>Your Monthly Expense Chart</h1>
      </div>
      <div className='flex justify-center items-center'>
        <Chart/>
      </div>
    </div>
  )
}

export default MonthlyChart
