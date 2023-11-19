import { useNavigate } from "react-router-dom";

const Navbar = ({  }) => {
    const navigate = useNavigate(); 

    return (
        <>
        
            <div className="flex flex-row justify-between items-center w-full h-16 px-12 bg-gray-900">
                <h1 className="text-white">Zookuk like butt</h1>
                <div className="flex flex-row gap-5">
                    <button 
                        className="px-8 py-2"
                        onClick={() => navigate('/login')}
                    >
                        <h1 className="text-white">Login</h1>
                    </button>
                    <button 
                        className="bg-white px-8 py-2 rounded-full"
                        onClick={() => navigate('/signup')}
                    >
                        <h1 className="text-black">Signup</h1>
                    </button>
                </div>
            </div>
        
        </>
    )
}

export default Navbar;