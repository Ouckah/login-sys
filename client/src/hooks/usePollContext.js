import { PollContext } from "../context/PollContext";
import { useContext } from "react";

export const usePollContext = () => {
    const context = useContext(PollContext);

    if (!context) {
        throw Error('usePollContext must be used inside an PollContextProvider');
    }

    return context;
}