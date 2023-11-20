import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePollContext } from "../hooks/usePollContext";
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const Poll = ({ id, content, likes, dislikes }) => {
    const { user } = useAuthContext();
    const { dispatch } = usePollContext();

    const navigate = useNavigate();

    const likePoll = async () => {
        const poll = await fetch(`http://localhost:4000/api/poll/like/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user._id })
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
            return res.json();
        })
        .then((data) => {
            dispatch({ type: "UPDATE_POLL", payload: data })
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const unlikePoll = async () => {
        const poll = await fetch(`http://localhost:4000/api/poll/unlike/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user._id })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            dispatch({ type: "UPDATE_POLL", payload: data })
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const dislikePoll = async () => {
        const user_id = { user_id: user._id };
        const poll = await fetch(`http://localhost:4000/api/poll/dislike/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_id)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            dispatch({ type: "UPDATE_POLL", payload: data })
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const undislikePoll = async () => {
        const user_id = { user_id: user._id };
        const poll = await fetch(`http://localhost:4000/api/poll/undislike/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_id)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            dispatch({ type: "UPDATE_POLL", payload: data })
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
        
            <div className="flex flex-row justify-between items-center w-full h-36 bg-white shadow-sm rounded-md">
                <div className="flex w-4/5 h-full justify-center items-center">
                    <h1 className="text-gray-800 font-extralight italic text-xl">"{ content }"</h1>
                </div>

                {user &&
                    <div className="flex flex-col w-1/5 h-full justify-center items-center">

                        {!likes.includes(user._id) ? (
                                <button 
                                    className="flex flex-row justify-center items-center w-full h-1/2 border-b-black border-b-2 border-l-2 gap-5"
                                    onClick={async () => {if (user && dislikes.includes(user._id)) await undislikePoll(); await likePoll()}}
                                >
                                    <ThumbsUp />
                                    <h1>{ likes.length }</h1>
                                </button>
                            ) : (
                                <button 
                                    className="flex flex-row justify-center items-center w-full h-1/2 border-b-black border-b-2 border-l-2 gap-5"
                                    onClick={unlikePoll}
                                >
                                    <ThumbsUp color="green"/>
                                    <h1 className="text-green-500">{ likes.length }</h1>
                                </button>
                            )
                        }

                        {!dislikes.includes(user._id) ? (
                                <button 
                                    className="flex flex-row justify-center items-center w-full h-1/2 border-t-black border-t-2 border-l-2 gap-5"
                                    onClick={async () => {if (user && likes.includes(user._id)) await unlikePoll(); await dislikePoll()}}
                                >
                                    <ThumbsDown />
                                    <h1>{ dislikes.length }</h1>
                                </button>
                            ) : (
                                <button 
                                    className="flex flex-row justify-center items-center w-full h-1/2 border-t-black border-t-2 border-l-2 gap-5"
                                    onClick={undislikePoll}
                                >
                                    <ThumbsDown color="red"/>
                                    <h1 className="text-red-500">{ dislikes.length }</h1>
                                </button>
                            )
                        }
                    </div>
                }
                {!user &&
                    <div className="flex flex-col w-1/5 h-full justify-center items-center">

                        <button 
                            className="flex flex-row justify-center items-center w-full h-1/2 border-b-black border-b-2 border-l-2 gap-5"
                            onClick={() => navigate('/signup')}
                        >
                            <ThumbsUp />
                            <h1>{ likes.length }</h1>
                        </button>

                        <button 
                            className="flex flex-row justify-center items-center w-full h-1/2 border-t-black border-t-2 border-l-2 gap-5"
                            onClick={() => navigate('/signup')}
                        >
                            <ThumbsDown />
                            <h1>{ dislikes.length }</h1>
                        </button>

                    </div>
                }
            </div>
        
        </>
    )
}

export default Poll;