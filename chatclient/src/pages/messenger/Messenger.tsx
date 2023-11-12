import { MouseEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import OnlineChat from "../../components/OnlineChat";
import Cookies from 'js-cookie';
import { useGetConversationsMutation, useGetMessagesMutation, useSendMessageMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ConversationInterface, MessageInterface, OnlineUser } from "../../types";
import chatIcon from '../../assets/chatIcon.png';
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMessages, setCurrentMessages } from "../../redux/messagesSlice";
import { Socket, io } from 'socket.io-client';
import Spinner from "../../components/ui/Spinner";
import Header from "../../components/Header";

const Messenger = () => {
    const dispatch = useDispatch();
    const currentMessages = useSelector(selectCurrentMessages);
    const [newMessage, setNewMessage] = useState<string>('');
    const [arrivalMessage, setArrivalMessage] = useState<{ sender: string; text: string, createdAt: number } | null>(null);
    const [currentChat, setCurrentChat] = useState<ConversationInterface | undefined>();
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[] | undefined>();


    const socket = useRef<Socket | null>();

    const scrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    const [getConversations, {
        isLoading: isConversationsLoading,
        data: conversations,
        // error: conversationsError
    }] = useGetConversationsMutation();

    useEffect(() => {
        socket.current = io('ws://localhost:9800');
        socket.current.on("getMessage", (data: { senderId: string; text: string }) => {
            console.log(data, 'DATA');

            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        console.log(arrivalMessage, 'arrivalMessage');

        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            dispatch(setCurrentMessages([...currentMessages, arrivalMessage]))
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current?.emit("addUser", userId);
        socket.current?.emit("getUsers", (users: OnlineUser[]) => {
            setOnlineUsers(users);
        });
    }, [userId]);

    const [getMessages, {
        // isLoading: isMessagesLoading,
        data: messages,
        // error: messagesError
    }] = useGetMessagesMutation();

    const [sendMessage,
        {
            isLoading: isNewMessageSending,
            // error: newMessageError
        }
    ] = useSendMessageMutation();

    useEffect(() => {
        if (userId) {
            getConversations(userId);
        } else {
            () => navigate('/login');
        }
    }, [getConversations, navigate, userId]);

    useEffect(() => {

        currentChat && getMessages(currentChat?._id)
            .then(res => {
                if ('data' in res) {
                    dispatch(setCurrentMessages(res.data))
                }
            });

    }, [currentChat, dispatch, getMessages]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages, arrivalMessage]);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const message = {
            sender: userId || '',
            text: newMessage,
            conversationId: currentChat?._id || '',
        };

        const recieverId = currentChat?.members.find(member => member !== userId);

        socket.current?.emit('sendMessage', {
            senderId: userId,
            recieverId,
            text: newMessage,
        });


        sendMessage(message)
            .unwrap()
            .then((res) => dispatch(setCurrentMessages([...currentMessages, res])))
            .then(() => setNewMessage(''))
            .catch(() => toast.error('Message was not sent'));
    };


    return (
        <div>
            <Header />
            <div className="flex h-[95vh] overflow-auto justify-center bg-neutral-50 ">
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
                                    <div key={el?._id} onClick={() => setCurrentChat(el)}>
                                        <Conversation conversation={el} userId={userId} />
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
                                    <div className="overflow-auto">

                                        {currentMessages?.map((message: MessageInterface) => {
                                            if (message) {
                                                return <div key={message._id} ref={scrollRef}>
                                                    <Message text={message.text} createdAt={format(message.createdAt)} own={message.sender === userId} />
                                                </div>
                                            }
                                            return null;
                                        })}

                                    </div>
                                    <div className="border-t border-separate mt-2" />
                                    <div className="flex justify-center">
                                        <textarea
                                            className="w-[450px] bg-gray-200 focus:bg-gray-100 rounded-2xl p-3 mt-7 font-light text-black resize-none"
                                            placeholder="Just start typing ..."
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        >
                                        </textarea>
                                        <button
                                            className="w-[100px] h-[50px] bg-blue-500 active:bg-blue-800 rounded-2xl disabled:bg-gray-500 text-white ml-3 mt-5 self-center"
                                            onClick={handleSubmit}
                                            disabled={!newMessage}
                                        >
                                            {isNewMessageSending ?
                                                <Spinner height={20} width={20} color="white-200" /> :
                                                'Send'
                                            }
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
                        {
                            onlineUsers?.map((user: OnlineUser) => (
                                <OnlineChat />
                            ))
                        }

                        {/* <OnlineChat />
                    <OnlineChat />
                    <OnlineChat /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger;
