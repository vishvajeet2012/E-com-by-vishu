import FrontPageAdopt from "./Adopt/FrontPageAdpot"
import Home from "./Home/Home"
import AllPetpProduct from "./PetProduct/AllPetpProduct"
import Product from "./Product/Product"


function MainFronted(){
    return((
        <>
   <Home/>
   <h1 className="text-center bg-white text-5xl pt-10 font-semibold m-0  text-black "> MarketPlace</h1>

   <Product/>
   <FrontPageAdopt/>
<hr></hr>
<h1 className="text-center bg-white text-5xl pt-10 font-semibold m-0 text-black ">Pet Product</h1>
        <AllPetpProduct/>

        </>
    ))
}

export default MainFronted