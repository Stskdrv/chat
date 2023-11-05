import { useEffect } from "react";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import OnlineChat from "../../components/OnlineChat";
import Cookies from 'js-cookie';
import { useGetConversationsMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ConversationInterface } from "../../types";

const Messenger = () => {
    // const [conversations, setConversations] = useState([]);
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [getСonversations, {isLoading, data: conversations, error}] = useGetConversationsMutation();

    useEffect(() => {
        if(userId) {
            getСonversations(userId);
        } else {
            () => navigate('/login');
        }
    },[getСonversations, navigate, userId])

    console.log(conversations, 'conversations');
    

    return (
        <div className="flex h-[100vh] overflow-auto justify-center bg-neutral-50 ">
            <div className="flex-[3] ">
                <div className="p-[10px] m-5 rounded-xl">
                    <input 
                        placeholder="Search for friends..." 
                        className="
                            w-[100%] 
                            font-light
                            p-2
                            border-b
                            rounded-sm
                            border-gray-400
                            bg-neutral-50
                            focus:bg-neutral-200
                            duration-300" 
                    />
                    {
                        conversations?.map((el: ConversationInterface) => (
                            <Conversation key={el._id} conversation={el} userId={userId} />
                        ))
                    }
                </div>
            </div>
            <div className="flex-[5]">
                <div className="bg-white p-[10px] m-5 rounded-xl">
                    <div className="h-[80vh] overflow-auto">
                        <Message />
                        <Message own />
                        <Message />
                        <Message own />
                    </div>
                    <div className="border-t border-separate mt-2" />
                    <div className="flex justify-center">
                        <textarea
                            className="w-[450px] bg-gray-200 focus:bg-gray-100 rounded-2xl p-3 mt-7 font-light text-black resize-none"
                            placeholder="Just start typing ..."
                        >
                        </textarea>
                        <button 
                            className="w-[100px] h-[50px] bg-blue-500 active:bg-blue-800 rounded-2xl text-white ml-3 mt-5 self-center"
                            onClick={() => Cookies.remove('token')}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-[2]">
                <div className="p-[10px] m-5 rounded-xl">
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                </div>
            </div>
        </div>
    )
}

export default Messenger;
