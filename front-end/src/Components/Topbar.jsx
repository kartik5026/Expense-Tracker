
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import axios from 'axios';
function TopBar() {
    const [access,setAccess] = useState();
    const [name,setName] = useState('');
    useEffect(()=>{
        
        getDataFromBackEnd();
      
    },[])


    
    

     async function getDataFromBackEnd(){
        const moneyDetails = await axios.get('https://expense-tracker-lk4n.onrender.com/', {withCredentials:true});
        const res = moneyDetails.data;
        console.log(res);
        if(res.msg==='granted'){
            setAccess(true);
            setName(res.userName);
        }
        else{
            setAccess(false);
        }
    
    }
    console.log(access+" topbar");
    return (
        <>

            <div className="flex justify-between  bg-blue-950 text-white py-4 flex-wrap">
                <div className="mx-4">
                    <a href="/"><h1 className="text-lg md:text-4xl">Money Tracker</h1></a>
                </div>
                
                    <div className={access?'hidden':'block'}>
                        <Link to="/signup"><button className="bg-blue-800 rounded-lg text-white py-2 px-4 mx-4 text-sm md:text-lg">Sign up</button></Link>
                        <Link to="/login"><button className="bg-blue-800  rounded-lg text-white py-2 px-4 mx-4 text-sm md:text-lg">Login</button></Link>
                        
                    </div>
                 <div className={access ? 'block' : 'hidden'}>
                     <marquee className="text-center md:text-xl p-2">Welcome! {name}</marquee>

                </div>
                    <div className={access?'block':'hidden'}>
                    
                    <Logout/>
                    </div>
            </div>
        </>

    )
}
export default TopBar;
