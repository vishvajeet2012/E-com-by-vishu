import Home from "./Home/Home"
import Product from "./Product/Product"


function MainFronted(){
    return((
        <>
   <Home/>
   <h1 className="text-center bg-white text-5xl pt-10 font-semibold m-0  text-black "> MarketPlace</h1>
   <Product/>
        </>
    ))
}

export default MainFronted