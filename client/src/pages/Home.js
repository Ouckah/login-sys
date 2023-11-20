import Poll from "../components/Poll";
import { usePollContext } from "../hooks/usePollContext";

function Home() {
    const { polls } = usePollContext();

    return (
        <>
        
            <div className="flex flex-col justify-center items-center w-full h-full bg-gray-100">
                <h1 className="text-black font-bold text-3xl p-8">Obviously True Statements</h1>

                <div className="flex flex-col justify-center items-center w-full gap-10 px-24">
                {polls &&
                    polls.map((poll) => (
                        <Poll 
                            key={poll._id}
                            id={poll._id}
                            content={poll.content}
                            likes={poll.likes}
                            dislikes={poll.dislikes}
                        />
                    ))
                }
                </div>
            </div>
        
        </>
    )
}

export default Home;