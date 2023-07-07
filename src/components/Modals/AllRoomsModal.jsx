import { memo, useState, useEffect, useRef } from "react";
import { DropDownField } from "../Common/DropDownField";
import { DropDownItem } from "../Common/DropDownItem";
import { nanoid } from "nanoid";
import { ModalCover } from "./ModalCover";
import { BsSearch } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { PiChatsCircleBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";


// Видалити, коли буде список с бєка та змінити key = id
const allRooms = ['Сергій12', 'Котята', 'Песики', 'Квітки', 'Дизайн', 'Віктоія17', 'Музика', 'Театр', 'Кіно', 'Сергій21', 'А', 'Я'];
const privateRooms = ['Сергій12', 'Віктоія17', 'Сергій21'];

export const AllRoomsModal = memo(({ onClose, setOpenedModal }) => {
    const [searchRoom, setsearchRoom] = useState("");
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [openDropDownIndex, setOpenDropDownIndex] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        setFilteredRooms(allRooms);
    }, []);

    useEffect(() => {
        const filtered = allRooms.filter(room =>
            room.toLowerCase().includes(searchRoom.toLowerCase())
        );
        setFilteredRooms(filtered);
    }, [searchRoom]);

    const onChangeHandler = (event) => {
        setsearchRoom(event.target.value);
    };

    const shortenRoomName = (roomName) => {
        if (roomName.length === 1) {
            return roomName.toLocaleUpperCase();
        }
        const shortenRoomName = roomName[0] + roomName.slice(-1);
        return shortenRoomName.toLocaleUpperCase();
    };

    const handleDropDownMenuOpen = (index) => {
        clearTimeout(timeoutRef.current);
        setOpenDropDownIndex(index);
    };

    const handleDropDownMenuClose = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropDownIndex(null);
        }, 200);
    };

    const isInPrivateList = (room) => {
        return privateRooms.includes(room);
    };

    const sortRoomsAscending = () => {
        const sortedRooms = [...filteredRooms].sort((a, b) => a.localeCompare(b));
        setFilteredRooms(sortedRooms);
    };

    const sortRoomsDescending = () => {
        const sortedRooms = [...filteredRooms].sort((a, b) => b.localeCompare(a));
        setFilteredRooms(sortedRooms);
    };

    return (
        <ModalCover onClose={onClose}>
            <div className="p-6">
                <h3 className="text-center font-bold mb-2">Всі кімнати</h3>
                <form className="relative">
                    <input
                        type="text"
                        onChange={onChangeHandler}
                        value={searchRoom}
                        className="w-full px-4 py-2 border rounded mb-2"
                        placeholder="Пошук кімнати"
                    />
                    <BsSearch className="absolute top-[12px] right-[15px]" />
                </form>
                <div className="flex justify-center gap-5 mb-2">
                    <button
                        onClick={sortRoomsAscending}
                    >
                        Від А-Я
                    </button>
                    <button
                        onClick={sortRoomsDescending}
                    >
                        Від Я-А
                    </button>
                </div>
                <ul style={{ height: '280px' }} className="items-start w-[600px] overflow-hidden overflow-y-scroll mb-5">
                    {filteredRooms.length > 0 ? filteredRooms.map((room, index) => (
                        <li key={index} className="flex items-start justify-between border border-black p-2 mb-3 relative">
                            <div className="flex">
                                <span className="flex items-center justify-center px-4 py-2 border mr-5 rounded font-bold">
                                    {shortenRoomName(room)}
                                </span>
                                <div className="flex flex-col">
                                    <span>{room}</span>
                                    <span className="text-sm text-gray-600">Кількість учасників</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="mb-2"
                                    onMouseEnter={() => handleDropDownMenuOpen(index)}
                                    onMouseLeave={handleDropDownMenuClose}
                                >
                                    <HiDotsVertical />
                                </button>
                                {openDropDownIndex === index && (
                                    <div
                                        className="absolute top-[20px] right-[20px] z-[1000]"
                                        onMouseEnter={() => handleDropDownMenuOpen(index)}
                                        onMouseLeave={handleDropDownMenuClose}
                                    >
                                        <DropDownField>
                                            <DropDownItem key={nanoid()} text={"Доєднатись до кімнати"}>
                                                <PiChatsCircleBold />
                                            </DropDownItem>
                                        </DropDownField>
                                    </div>
                                )}
                                {isInPrivateList(room) ? <FiEyeOff /> : <BsEye />}
                            </div>
                        </li>
                    )) : <p className="text-center">Кімнату не знайдено</p>}
                </ul>
                <div className="flex justify-center">
                    <button
                        className="flex items-center gap-10 px-4 py-2 border border-black rounded"
                        onClick={() => setOpenedModal("CreateNewRoom")}
                    >
                        Створити нову кімнату<AiOutlinePlus />
                    </button>
                </div>
            </div>
        </ModalCover>
    );
});
