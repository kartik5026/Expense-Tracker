import heroImage from "../Images/hero_desktop.jpg";
import heroMobile from "../Images/hero_mobile.jpg";
function Denied() {
    return (
        <>
            <div className='text-center mt-4 '>Access Denied please Login first
                <div className=''>
                    <img src={heroImage} className='w-[80vw] h-[70vh] mx-auto md:block hidden rounded-2xl'></img>
                    <img src={heroMobile} className="w-[80vw] h-[50vh] mx-auto md:hidden block rounded-2xl"></img>
                </div>
            </div>

        </>
    )
}
export default Denied;