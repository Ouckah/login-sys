import { useState } from "react";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signUp = (email, password) => {
        const user = { email, password };

        const response = fetch('http://localhost:4000/api/user/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify(user)
        })
        .then((res) => {
            if (!res.ok) {
                // Check if the response has JSON content
                if (res.headers.get('content-type')?.includes('application/json')) {
                    return res.json().then((errorData) => {
                        throw new Error(`${errorData.error}`);
                    });
                } else {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            }
            console.log('User signed up successfully!');
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error.message);
        });
    }

    return (
        <>
        
            <div className="flex justify-center items-center w-full h-full bg-gray-100">
                <div className="flex flex-col justify-center items-center w-96 h-2/3 bg-white shadow-md gap-10">
                    <h1 className="text-black font-semibold text-2xl tracking-wide uppercase">Signup</h1>

                    <div className="flex flex-col gap-3">
                        <label className="text-medium">Email</label>
                        <input 
                            className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full outline-none" 
                            placeholder="someone@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <label className="text-medium">Password</label>
                        <input 
                            className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full outline-none"
                            type="password"
                            placeholder="••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        className="bg-black px-12 py-2 rounded-full"
                        onClick={() => signUp(email, password)}
                    >
                        <h1 className="text-white">Sign Up</h1>
                    </button>
                </div>
            </div>
        
        </>
    )
}

export default Signup;