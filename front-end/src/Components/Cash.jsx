function CashIn() {
    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Cash Form</h2>
            <form className="space-y-6" action="http://localhost:3000/cash" method="post">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label htmlFor="date" className="block text-lg mb-2">Date</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg text-black" type="date" name="inputDate" />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label className="block text-lg mb-2">Amount</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg text-black" type="number" name="inputAmount" placeholder="Enter the Amount" required />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label className="block text-lg mb-2">Contact</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg text-black" type="text" name="inputName" placeholder="Enter the Contact" required />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label className="block text-lg mb-2">Remarks</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg text-black" type="text" name="inputRemarks" placeholder="Enter Party Name" required />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label className="block text-lg mb-2">Category</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg text-black" name="inputCategory">
                            <option>Salary</option>
                            <option>Rent</option>
                            <option>Deposit</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label className="block text-lg mb-2">Cash Mode</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg text-black" name="inputMode">
                            <option>Cash</option>
                            <option>Online</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <label className="block text-lg mb-2">Cash Type</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg text-black" name="cashType">
                            <option>In</option>
                            <option>Out</option>
                        </select>
                    </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-200 ease-in-out">Save</button>
            </form>
        </div>
    )
}
export default CashIn;
