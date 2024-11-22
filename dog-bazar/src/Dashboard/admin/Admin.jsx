import AdminProduct from "./Product/AdminProduct";
import DogSection from "./Product/DogSection";

function Admin() {
  return (
    <>
      <div className="h-screen flex w-screen justify-center">
        <div className="p-10 bg-[#1c1c1c] adminMain w-full max-w-screen-lg">
          {/* Header Section */}
          <div className="flex items-end justify-between mb-8">
            <h1 className="text-2xl text-cyan-100 font-medium">
              Hello<br />
              <span className="text-3xl text-cyan-50 font-semibold">
                name 👋
              </span>
            </h1>
            <button
              className="bg-red-600 text-cyan-100 text-lg font-medium px-2 rounded-md"
            >
              Logout
            </button>
          </div>

          {/* Main Content Section: AdminProduct and DogSection */}
          <div className="flex flex-wrap gap-8 justify-start">
            {/* AdminProduct Section */}
            
              <AdminProduct />
        

            {/* DogSection */}
            
              <DogSection />
      
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
