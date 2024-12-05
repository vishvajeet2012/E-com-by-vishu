import { Link } from "react-router-dom"
import Listproduct from "./Listproduct"

function DogSection(){
    return (
        <>
 <div className="flex mt-10 justify-between gap-5">
      <div className="py-6 px-6 rounded-xl w-full bg-blue-500">
    <h2 className="text-2xl font-semibold"></h2> 
        <h3 className="text-xl font-medium">Dogs</h3>

       <Link to="/dogsection"> <button   className="mt-4 px-4 py-2 rounded-lg bg-white text-black-500 font-semibold hover:bg-gray-200" >
     DogSection
        </button></Link>
      </div>



      
    </div> 
   
        </> 
    )
}
export default DogSection