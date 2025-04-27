
function Transaction({ transaction }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 w-full">
      {/* Transaction Details */}
      <div className="flex flex-col md:flex-row items-center md:space-x-6 w-full">
        {/* Amount */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-xl text-gray-800">
            ${transaction.amount}
          </span>
        </div>

        {/* Description */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">{transaction.description}</span>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">{transaction.date}</span>
        </div>
      </div>

      {/* Action Buttons */}
    </div>
  );
}

export default Transaction;
