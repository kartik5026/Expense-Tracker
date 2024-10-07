function Signup() {
    return (
        <>
            <form action="https://expense-tracker-lk4n.onrender.com/signup" method="post">
                <div className="flex  text-black flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create Your Account</h2>
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300"
                                type="text"
                                placeholder="Enter Your Username"
                                name="username"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300"
                                type="text"
                                placeholder="Enter Your Password"
                                name="password"
                            />
                        </div>
                        <div className="text-center">
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                type="submit"
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Signup;
