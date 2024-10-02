
function Login() {
    return (
        <>
            <form action="https://cashappbackend.onrender.com/login" method="post">
                <div className="flex flex-wrap justify-center p-10 text-black">
                    <div>
                        <input className=" min-w-[300px]" type="text" placeholder="Enter Your Name" name="username"></input>
                    </div>
                    <div>
                        <input className="mx-4 min-w-[300px]" type="text" placeholder="Enter Your Password" name="password"></input>
                    </div>
                    <div>
                        <button className="bg-blue-700 px-4 py-1 rounded-xl text-white mx-4">Login</button>
                    </div>
                </div>

            </form>
        </>
    )
}
export default Login;