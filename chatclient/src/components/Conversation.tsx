import { useEffect } from 'react';
import personImg from '../assets/person.png';
import { ConversationInterface } from '../types';
import { useGetUserMutation } from '../services/api';

const Conversation = ({ conversation, userId }: { conversation: ConversationInterface, userId: string | undefined }) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getUser, { isLoading, data: friendData, error }] = useGetUserMutation();

  useEffect(() => {
    const friendId = conversation.members.find((el) => el !== userId);
    getUser(friendId);

  }, [conversation.members, getUser, userId]);

  return (
    <div className="flex items-center gap-3 m-2 cursor-pointer hover:bg-gray-100 rounded-xl p-2 ">
      {
        isLoading ?
          <p>Loading...</p> :
          (<>
            <img className="h-[50px] border-2 border-grey-600 rounded-full object-cover" src={personImg} alt="preson" />
            <span className="font-normal">{friendData?.username}</span>
          </>)
      }

    </div>
  )
};

export default Conversation;
