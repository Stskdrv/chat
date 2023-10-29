import { MouseEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { UserResponse, useLoginMutation } from "../services/api";
import toast, { Toaster } from 'react-hot-toast';
import spinner from '../assets/spinner.gif';


const LoginForm = () => {
    const password = useRef<HTMLInputElement>(null);
    const username = useRef<HTMLInputElement>(null);

    const [login, { isLoading, data, error, status }] = useLoginMutation();

    const handleSubbit = async (e: MouseEvent) => {
        e.preventDefault();
        console.log(password.current?.value, 'password.current?.value');
            await login({ password: password.current?.value, username: username.current?.value })
            .unwrap()
            .then((payload) => toast('fulfilled'))
            .catch((e) => {
                console.log(e);
                toast(`${e.status} ${e.data.message}`)
            })
    }
    return (
        <div className="h-[300px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between">
            <Toaster />
            <input
                type="text"
                placeholder="Username"
                className="h-[50px] rounded-[10px] border border-gray-400 text-lg p-[8px] font-light "
                ref={username}
            >
            </input>
            <input
                type="password"
                placeholder="Password"
                className=" h-[50px] rounded-[10px] border border-gray-400 text-lg p-[8px] font-light "
                ref={password}
            >
            </input>
            {
                isLoading ?
                    <img className="w-[120px] h-[120px] self-center" src={spinner} alt='loading' /> : (
                    <>
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
                            "
                            onClick={handleSubbit}
                        >
                            Log In
                        </button>
                        <span className="ml-[20%]">
                            Forgot Password?
                        </span>
                        <Link to={'/register'} className="
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
                            <p className="flex justify-center mt-[13px]">Go to register!</p>
                        </Link>
                    </>
                )
            }

        </div>
    )
}

export default LoginForm;
