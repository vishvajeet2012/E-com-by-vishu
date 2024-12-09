import backgorundimg from './adopt_origdd.png';

function FrontPageAdopt() {
    return (
        <div
            className="main-container w-full h-44 flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgorundimg})`,
                backgroundColor: '#f8942b', // Fallback color
            }}
        >
            <div className="contentBox text-center px-4 md:px-8 mt-[10%]">
                <div className="HeadingBox">
                    <a
                        href="/adopt"
                        className="bg-white text-[#000000] mt-8 px-6 py-2 rounded-lg text-sm md:text-lg font-medium"
                    >
                        Adopt Now
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FrontPageAdopt;
