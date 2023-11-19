import Poll from "../components/Poll";

function Home() {
    const pollData = 
    [
        "People should donate to charity.",
        "Ultimate Frisbee is a peak sport.",
        "Ouckah is the best Computer Science content creator."
    ]

    return (
        <>
        
            <div className="flex flex-col justify-center items-center w-full h-full bg-gray-100">
                <h1 className="text-black font-bold text-3xl p-8">Obviously True Statements</h1>

                <div className="flex flex-col justify-center items-center w-full gap-10 px-24">
                {
                    pollData.map((title) => (
                        <Poll title={title} />
                    ))
                }
                </div>
            </div>
        
        </>
    )
}

export default Home;