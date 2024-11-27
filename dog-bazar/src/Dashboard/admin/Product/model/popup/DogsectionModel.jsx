
import { useState } from "react";
import PopDogie from "./PopDogie";
import Listproduct from "../../Listproduct";
import UpdatePetDetails from "./UpdatePetDetails";

function DogsectionModel() {
  const [showModel, setShowModel] = useState(false);
  const [showUpdateProducts , setShowUpdateProduct] = useState(false);

   
    const showUpdateProduct =()=> setShowUpdateProduct(false)
  
    const closeModal =()=>setShowModel(false)
  return (
    <>


<div className="flex mt-10 justify-between gap-5">
      <div className="py-6 px-6 rounded-xl w-full bg-blue-500">
    <h2 className="text-2xl  font-semibold"></h2> 
        <h3 className="text-xl font-medium text-white ">Add DogsForSale</h3>
 <button onClick={() => setShowModel(true)} className="mt-4 px-6 py-2 rounded-lg bg-white text-black-500 font-semibold hover:bg-gray-200" >
     Add
        </button>
      </div>


      <div className="py-6 px-6 rounded-xl w-full bg-green-800">
    <h2 className="text-2xl  font-semibold"></h2> 
        <h3 className="text-xl font-medium text-white ">Add Update Pet Data</h3>
 <button onClick={() => setShowUpdateProduct(true)} className="mt-4 px-6 py-2 rounded-lg bg-white text-black-500 font-semibold hover:bg-gray-200" >
     Add
        </button>
      </div>
      

    </div> 
      
{showUpdateProducts && <UpdatePetDetails showUpdateProduct={showUpdateProduct} />}
    {showModel && <PopDogie   closeModal={closeModal}/>}
    <Listproduct/>
    
    </>
  );
}

export default DogsectionModel;
