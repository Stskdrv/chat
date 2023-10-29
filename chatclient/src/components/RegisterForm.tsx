import { Link } from "react-router-dom";


const RegisterForm = () => {
    return (
        <div className="flex flex-col flex-1 justify-center">
            <div className="h-[450px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between">
                <input
                    type="text"
                    placeholder="Name"
                    className="h-[50px] rounded-[10px] border border-gray-400 text-lg p-[8px] font-light ">
                </input>
                <input
                    type="email"
                    placeholder="Email"
                    className="h-[50px] rounded-[10px] border border-gray-400 text-lg p-[8px] font-light ">
                </input>
                <input
                    type="password"
                    placeholder="Password"
                    className=" h-[50px] rounded-[10px] border border-gray-400 text-lg p-[8px] font-light ">
                </input>
                <button className="
                    h-[50px] 
                    rounded-[10px]
                    bg-blue-600 w-[30%] 
                    text-white 
                    font-light
                    self-center  
                    transform 
                    transition-transform 
                    hover:scale-105 
                    active:bg-blue-700 
                    focus:outline-none
                ">
                    Register
                </button>
                <span className="ml-[20%]">
                    Already have an account? Log in!
                </span>
                <Link to={'/login'} className="
                    h-[50px] 
                    rounded-[10px]
                    bg-green-500 w-[40%] 
                    text-white
                    font-light
                    self-center  
                    transform 
                    transition-transform 
                    hover:scale-105 
                    active:bg-blue-700 
                    focus:outline-none
                    
                ">
                    <p className="flex justify-center mt-[13px]">Go to log in!</p>
                </Link>
            </div>
        </div>
    )
}

export default RegisterForm;
