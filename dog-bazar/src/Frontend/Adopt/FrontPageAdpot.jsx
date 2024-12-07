function FrontPageAdopt() {
    return (
        <>
            <div className="main-container w-full h-44 bg-[#f8942b] flex items-center justify-center">
                <div className="contentBox text-center px-4 md:px-8">
                    <div className="HeadingBox">
                        <h2 className="text-white text-2xl md:text-4xl font-semibold">Pet Adoption</h2>
                        <p className="text-white text-sm md:text-lg mt-2 mb-4">Find your perfect companion today!</p>
                        <a 
                            href="/adopt" 
                            className="bg-white text-[#f8942b] px-6 py-2 rounded-lg text-sm md:text-lg font-medium"
                        >
                            Adopt Now
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FrontPageAdopt;
