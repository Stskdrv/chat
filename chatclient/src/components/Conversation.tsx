import personImg from '../assets/person.png';

const Conversation = () => {
  return (
    <div className="flex items-center gap-3 m-2 cursor-pointer hover:bg-gray-100 rounded-xl p-2 ">
        <img className="h-[50px] border-2 border-grey-600 rounded-full object-cover" src={personImg} alt="preson" />
        <span className="font-normal">John</span>
    </div>
  )
};

export default Conversation;
