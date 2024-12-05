
import { useState } from "react";

import Listproduct from "../../Product/Listproduct";
import PopPetProduct from "./PopPetProduct";
import PetProduct from "../../Adpot/petProduct/PetProduct";

function PetProductModel() {
  const [showModel, setShowModel] = useState(false);

   
  
    const closeModal =()=>setShowModel(false)
  return (
    <>


<div className="flex mt-10 justify-between gap-5">
      <div className="py-6 px-6 rounded-xl w-full bg-pink-500">
    <h2 className="text-2xl  font-semibold"></h2> 
        <h3 className="text-xl font-medium text-white ">Add Product For Sale</h3>
 <button onClick={() => setShowModel(true)} className="mt-4 px-6 py-2 rounded-lg bg-white text-black-500 font-semibold hover:bg-gray-200" >
     Add
        </button>
      </div>


      

    </div> 
      
    {showModel && <PopPetProduct   closeModal={closeModal}/>}
    <Listproduct/>
    
    </>
  );
}

export default PetProductModel;
