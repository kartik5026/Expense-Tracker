import { Route, Routes } from "react-router-dom";

import "./index.css";
import Cash from "./Components/Cash";
import Home from "./Components/Home";
import UserDataContext from "./ContextAPI/UserDataContext";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Logout from "./Components/Logout";


function App() {


  return (

    <div className="bg-[#001F3F] h-[100vh] w-auto text-white">


      <UserDataContext>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/cashIn" Component={Cash} />
          <Route path="/cashOut" Component={Cash} />
          <Route path="/signup" Component={Signup}></Route>
          <Route path="/login" Component={Login}></Route>
          
        </Routes>
      </UserDataContext>

    </div>
  )
}

export default App
