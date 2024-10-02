import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { userContext } from '../ContextAPI/UserDataContext';
import axios from 'axios';
function Main(){
    const {userData,setUserData} = useContext(userContext);

    async function handleChange(e){
        const val  = e.target.value;
        const uri = "https://expense-tracker-app-cpuk.onrender.com//search/"+""+val;
        const res = await axios.get(uri);
        const data = res.data;
        console.log(data);
        if(data.msg==='Not Found'){
            setUserData([]);
        }
        else{
            setUserData(data);
        }
        


    }
    return(
        <>
        <div className="flex justify-center mt-10 gap-10  flex-wrap">
            
            <div>
                <input type="text" placeholder="Search by name" className="border py-2  border-black px-20 text-black rounded-2xl " onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                
                <Link to="/cashIn"> <button className="bg-green-600 px-4 py-2 rounded-lg text-white mx-4 text-xl">+ Cash In</button></Link>
               
                <Link to="/cashOut"><button className="bg-red-600 px-4 py-2 rounded-lg text-white mx-4 text-xl">- Cash Out</button></Link>
            </div>
        </div>
        </>
    )
}
export default Main;
