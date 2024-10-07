function Logout(){
    return(
        <>
        <form action="http://localhost:3000/logout" method="post">
            <button className="bg-blue-700 px-4 py-2 rounded-xl text-white mx-4">Log Out</button>
        </form>
        </>
    )
}
export default Logout;
