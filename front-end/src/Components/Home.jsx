import TopBar from "./Topbar";

import MoneyDetails from "./MoneyDetails";
function Home() {
    return (
        <>
            <div className="font-mono  overflow-y-scroll h-[100vh]">
                <TopBar/>
                <MoneyDetails />
            </div>
        </>
    )
}
export default Home;