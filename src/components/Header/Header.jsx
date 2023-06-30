export const Header = ({userName}) => {
    return (
        <div className="fixed w-screen h-[80px] z-10 bg-[#D9D9D9] text-2xl">
            <div className="h-full flex items-center justify-between m-auto">
                <div className="w-[345px] text-center">LOGO</div>

                <div className="mr-[100px] flex gap-[30px]">
                    <button className="rounded-full bg-white p-2">Theme button</button>

                    {userName === '' ?
                        <button className="min-w-[223px]">UA/ENG</button>:
                        <button className="rounded-full bg-white p-2 min-w-[223px]">{userName}</button>
                    }
                </div>
            </div>
        </div>
    )
};