import { useState } from 'react';
import { RoomDropDownMenu } from '../Common/RoomDropDownMenu';

export const OneActiveRoom = ({
    name,
    amountOfActiveUsers,
    lastMessage,
    areActiveRoomsOpen,
    type,
}) => {
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

    const handleDropDownMenuButton = e => {
        e.stopPropagation();
        setIsDropDownMenuOpen(!isDropDownMenuOpen);
    };

    return (
        <div className="relative border w-full p-4 flex gap-2">
            <div className="border flex justify-center items-center p-4">
                {name.slice(0, 2).toUpperCase()}
            </div>

            {areActiveRoomsOpen && (
                <div className="w-full flex flex-col justify-between">
                    <p className="absolute bottom-0 right-1">
                        {amountOfActiveUsers}
                    </p>

                    <button
                        type="button"
                        className="absolute top-0 right-1"
                        onClick={handleDropDownMenuButton}
                    >
                        ...
                    </button>

                    <h3 className="font-bold">{name}</h3>
                    <p className="text-xs">{lastMessage}</p>
                </div>
            )}

            {areActiveRoomsOpen && isDropDownMenuOpen && (
                <div className="absolute top-[20px] right-[13px]">
                    <RoomDropDownMenu type={type} />
                </div>
            )}
        </div>
    );
};
