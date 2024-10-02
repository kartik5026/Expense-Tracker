function Signup() {
    return (
        <>
            <form action="https://cashappbackend.onrender.com/signup" method="post">
                <div className="justify-center text-black flex flex-wrap p-10">
                    <div className="">
                        <input className="border border-black  min-w-[300px]" type="text" placeholder="Enter Your Name" name="username"></input>
                    </div>
                    <div className="">
                        <input className="md:mx-4 border border-black min-w-[300px]" type="text" placeholder="Enter Your Password" name="password"></input>
                    </div>
                    <div className="">
                        <button className="bg-blue-700 px-4 py-1 rounded-xl text-white md:mx-4">Signup</button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default Signup;