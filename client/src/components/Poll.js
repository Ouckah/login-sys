const Poll = ({ title }) => {
    return (
        <>
        
            <div className="flex flex-row justify-between items-center w-full h-36 bg-white shadow-sm rounded-md">
                <div className="flex w-4/5 h-full justify-center items-center">
                    <h1 className="text-gray-800 font-extralight italic text-xl">"{ title }"</h1>
                </div>

                <div className="flex flex-col w-1/5 h-full justify-center items-center">
                    <button className="w-full h-1/2 bg-red-500">

                    </button>

                    <button className="w-full h-1/2 bg-green-500">

                    </button>
                </div>
            </div>
        
        </>
    )
}

export default Poll;