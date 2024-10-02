import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { userContext } from '../ContextAPI/UserDataContext';
import { FaDeleteLeft } from "react-icons/fa6";
import Main from './Main';

import Denied from './Denied';

function MoneyDetails() {
     const [access, setAccess] = useState('denied');
     const [size, setSize] = useState(0);
    useEffect(() => {
        getDataFromBackEnd();
      
    },[]);

    useEffect(()=>{
        getDataFromBackEnd();
    },[access])
   

    const { userData, setUserData } = useContext(userContext);
    
    const [cashIn, setCashIn] = useState(0);
    const [cashOut, setCashOut] = useState(0);
    const [totalCash, setTotalCash] = useState(0);
   
    const data = useSelector((state) => {
        return state.money;
    });
    // console.log(data);

    const dispatch = useDispatch();
    
    async function getDataFromBackEnd() {
     
        const obj = await axios.get("https://expense-tracker-app-cpuk.onrender.com/", {withCredentials:true});
        
        const res = obj.data;
        // console.log(res);
       
        if(res.msg=='granted'){

            
            setAccess(res.msg);
            setSize(res.data.length);
            setUserData(res.data);
            // console.log(res);
            {
                const cashInArr = res.data.filter((data) => {
                    return data.cashtype === 'In';
                })
                const cashOutArr = res.data.filter((data) => {
                    return data.cashtype === 'Out';
                })
                var cashInAmount = 0;
                var cashOutAmount = 0;
                cashInArr.map((data) => {
                    cashInAmount += data.amount;
                })
                cashOutArr.map((data) => {
                    cashOutAmount += data.amount;
                })
                const remainingCash = cashInAmount - cashOutAmount;

                setCashIn(cashInAmount);
                setCashOut(cashOutAmount);
                setTotalCash(remainingCash);

            }
        }
        else{
            setAccess('denied');
        }
    }
    
    // console.log(access);

    //PAGINATION:
   
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 3;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const dataArray = userData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(size / itemsPerPage);
    function paginate(n) {
        setCurrentPage(n);
    }

    async function handleClick(userRemark){
        alert(userRemark+" deleted");
        const obj = await axios.delete('https://expense-tracker-app-cpuk.onrender.com/delete',{data:{userRemark}},{withCredentials:true});
        
    }
   

    return (
        access === 'denied' ? <Denied/> :
            <div>
                <Main/>

                <div className="flex flex-wrap mt-5 justify-evenly text-center">
                    <p className="border min-w-[400px] border-gray-300 md:px-24 py-10 my-5 md:my-0 font-bold bg-white text-black rounded-xl">Cash In:{cashIn}</p>
                    <p className="border min-w-[400px] border-gray-300 md:px-24 py-10 my-5 md:my-0 font-bold bg-white text-black rounded-xl">Cash Out:{cashOut}</p>
                    <p className="border min-w-[400px] border-gray-300 md:px-24 py-10 my-5 md:my-0 font-bold bg-white text-black rounded-xl">Net Balance:{totalCash}</p>
                </div>



                <div className="mt-4 flex justify-center">
                    <table className='text-center ' border="2">
                        <tbody>
                            <tr className='border border-x-2'>

                                <th className=" md:px-20 md:text-2xl text-xs">Date</th>
                                <th className=" md:px-20 md:text-2xl text-xs">Remarks</th>
                                <th className=" md:px-20 md:text-2xl text-xs">Category</th>
                                <th className=" md:px-20 md:text-2xl text-xs">Mode</th>
                                <th className=" md:px-20 md:text-2xl text-xs">Amount</th>

                            </tr>
                            {
                                dataArray.length == 0 ? <tr ><td>User Not Found Go To <a href='/' className='text-red-400' >/Home</a> </td></tr> : dataArray.map((data, id) => (



                                    <tr className="border border-x-2" key={id}>
                                        <td className='text-xs md:text-xl'>{data.date}</td>
                                        <td className='text-xs md:text-xl'>{data.remarks}</td>
                                        <td className='text-xs md:text-xl'>{data.category}</td>
                                        <td className='text-xs md:text-xl'>{data.mode} </td>
                                        <td className={data.cashtype === 'In' ? 'text-green-400 ' : 'text-red-400 '}>{data.cashtype === 'In' ? '+' : '-'}{data.amount} </td>
                                        <td className='text-xs md:text-xl'><button onClick={()=>handleClick(data.remarks)} className='bg-white text-black rounded-sm px-4 py-1'><FaDeleteLeft /></button></td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div>

                <Pagination paginate={paginate} totalPages={totalPages} />

            </div>

    )
}
export default MoneyDetails;
