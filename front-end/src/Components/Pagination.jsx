function Pagination(props){ 
    const btnArray = [];
    const pages = props.totalPages;
    
    for(let i=1; i<=pages; i++){
        btnArray.push(i);
    }
    
    return(
        <div className="text-xl w-auto flex justify-center mt-4">
        {
            btnArray.map((val,id)=>(
                <button  key={id} className="text-white bg-blue-600 px-4 py-1 rounded-sm mx-1 hover:bg-gray-50 hover:text-black" onClick={()=>props.paginate(val)}>{val}</button>
            ))
        }
        
        </div>
    )
}
export default Pagination;