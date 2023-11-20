import { createContext, useReducer, useEffect } from "react";

export const PollContext = createContext();

export const pollReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POLLS':
            return { polls: action.payload };
        case 'CREATE_POLL':
            return { polls: [action.payload, ...state.polls] };
        case 'DELETE_POLL':
            return { polls: state.polls.filter((poll) => poll._id !== action.payload._id) };
        case 'UPDATE_POLL':
            return { polls: [action.payload, ...state.polls.filter((poll) => poll._id !== action.payload._id)] }
        default:
            return state;
    }
}

export const PollContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pollReducer, {
        polls: null
    });

    useEffect(() => {
        const fetchPolls = async () => {
            const polls = await fetch('http://localhost:4000/api/poll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch({ type: "SET_POLLS",  payload: data })
            })
            .catch((error) => {
                console.error(error);
            })
        }

        fetchPolls();
    }, []);

    return (
        <PollContext.Provider value={{...state, dispatch}}>
            { children }
        </PollContext.Provider>
    )
}