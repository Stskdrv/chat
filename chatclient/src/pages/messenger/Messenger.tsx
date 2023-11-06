import { useEffect, useState } from "react";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import OnlineChat from "../../components/OnlineChat";
import Cookies from 'js-cookie';
import { useGetConversationsMutation, useGetMessagesMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ConversationInterface, MessageInterface } from "../../types";
import chatIcon from '../../assets/chatIcon.png';
import { format } from "timeago.js";

const Messenger = () => {
    // const [conversations, setConversations] = useState([]);
    const userId = Cookies.get('userId');
    const navigate = useNavigate();


    const [getСonversations, {
        isLoading: isConversationsLoading,
        data: conversations,
        error: conversationsError
    }] = useGetConversationsMutation();

    const [currentChat, setCurrentChat] = useState<ConversationInterface | undefined>();

    const [getMessages, {
        isLoading: isMessagesLoading,
        data: messages,
        error: messagesError
    }] = useGetMessagesMutation();

    useEffect(() => {
        if (userId) {
            getСonversations(userId);
        } else {
            () => navigate('/login');
        }
    }, [getСonversations, navigate, userId]);

    useEffect(() => {
      
        currentChat && getMessages(currentChat?._id);
       
    }, [currentChat, getMessages])

    console.log(conversations, 'conversations');
    console.log(messages, 'messages');

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
                    {isConversationsLoading ?
                        <p className="text-center mt-5 text-xl">Loading...</p> :
                        (
                            conversations?.map((el: ConversationInterface) => (
                                <div onClick={() => setCurrentChat(el)}>
                                    <Conversation key={el?._id} conversation={el} userId={userId} />
                                </div>

                            ))
                        )
                    }
                </div>
            </div>
            <div className="flex-[6]">
                {
                    currentChat ?
                        (
                            <div className="bg-white p-[10px] m-5 rounded-xl">
                                <div className="h-[80vh] overflow-auto">

                                    {messages?.map(({text, sender, createdAt, _id}: MessageInterface) => (
                                        <Message key={_id} text={text} createdAt={format(createdAt)} own={sender === userId} />
                                    ))}

                         

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
                        ) :
                        <div className=" flex flex-col items-center justify-center bg-white w-[100%] h-[100%] rounded-xl self-center">
                            <img src={chatIcon} alt='chat' className="h-[150px] w-[150px] self-center mt-[20%]" />
                            <p className="self-center text-5xl text-gray-300"> Please choose the chat</p>
                        </div>
                }

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
