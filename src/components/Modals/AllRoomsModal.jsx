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
import { AiOutlineClose } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";


const allRooms = [{ name: 'a', password: 'b', private: true }, { name: 'ab', isPrivate: false }]

export const AllRoomsModal = memo(({ onClose, setOpenedModal, joinExistingRoom, openedRooms }) => {
    const [searchRoom, setSearchRoom] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [openDropDownIndex, setOpenDropDownIndex] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordType, setPasswordType] = useState("password");
    const timeoutRef = useRef(null);
    const inputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const handleRoomClick = (room) => {
        const isRoomOpened = openedRooms.some((openedRoom) => openedRoom._id === room._id);
        if (isRoomOpened) {
            alert("Ця кімната вже у вас відкрита");
            return;
        }
        setSelectedRoom(room);

        if (room.private) {
            setShowPasswordModal(true);
        } else {
            joinExistingRoom(room._id);
            onClose();
        }
    };

    const handlePasswordConfirm = (e) => {
        e.preventDefault();
        setPasswordConfirm(e.target.value)
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    const handleJoinRooms = (e) => {
        e.preventDefault();
        if (selectedRoom.password === passwordConfirm) {
            joinExistingRoom(selectedRoom._id);
            onClose();
        } else {
            alert('Паролі не співпадають. Повторіть спробу');
            setPasswordConfirm('');
        }
    }

    useEffect(() => {
        setFilteredRooms(allRooms);
    }, []);

    useEffect(() => {
        const filtered = allRooms.filter(({ name }) => (
            name.toLowerCase().includes(searchRoom.toLowerCase())
        )
        );
        setFilteredRooms(filtered);
    }, [searchRoom]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            inputRef.current.focus();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        if (showPasswordModal) {
            const timeoutId = setTimeout(() => {
                passwordInputRef.current.focus();
            }, 0);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [showPasswordModal]);

    const onChangeHandler = (event) => {
        setSearchRoom(event.target.value);
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

    const sortRoomsAscending = () => {
        const sortedRooms = [...filteredRooms].sort((a, b) => {
            const isUkrainianA = /^[А-ЯІЇЄҐа-яіїєґ\s]+$/.test(a.name);
            const isUkrainianB = /^[А-ЯІЇЄҐа-яіїєґ\s]+$/.test(b.name);

            if (isUkrainianA && !isUkrainianB) {
                return -1;
            } else if (!isUkrainianA && isUkrainianB) {
                return 1;
            } else {
                return a.name.localeCompare(b.name, "uk-UA", { sensitivity: "base" });
            }
        });
        setFilteredRooms(sortedRooms);
    };

    const sortRoomsDescending = () => {
        const sortedRooms = [...filteredRooms].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) {
                return 1;
            } else if (nameA > nameB) {
                return -1;
            } else {
                return 0;
            }
        });

        setFilteredRooms(sortedRooms);
    };

    return (
        <ModalCover onClose={onClose}>
            <div className="p-6">
                <h3 className="text-center font-bold mb-2">Всі кімнати</h3>
                <form className="relative">
                    <input
                        ref={inputRef}
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
                        <li key={nanoid()} className="flex items-start justify-between border border-black p-2 mb-3 relative">
                            <div className="flex">
                                <span className="flex items-center justify-center px-4 py-2 border mr-5 rounded font-bold">
                                    {shortenRoomName(room.name)}
                                </span>
                                <div className="flex flex-col">
                                    <span>{room.name}</span>
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
                                            <DropDownItem
                                                key={nanoid()}
                                                text={"Доєднатись до кімнати"}
                                                onClick={() => handleRoomClick(room)}
                                            >
                                                <PiChatsCircleBold />
                                            </DropDownItem>
                                        </DropDownField>
                                    </div>
                                )}
                                {room.private ? <FiEyeOff /> : <BsEye />}
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
                {showPasswordModal &&
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
                        <div className="bg-white rounded p-4 relative">
                            <h2 className="text-lg font-bold mb-4">Введіть пароль</h2>
                            <form>
                                <input
                                    ref={passwordInputRef}
                                    type={passwordType}
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirm}
                                    className="w-full px-4 py-2 border rounded mb-4 "
                                    placeholder="Пароль"
                                />
                                <BsEyeSlash
                                    onClick={togglePassword}
                                    className="absolute top-[75px] right-6 cursor-pointer"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-blue-500 text-white"
                                    onClick={handleJoinRooms}
                                >
                                    Доєднатись
                                </button>
                                <AiOutlineClose
                                    className="absolute top-1.5 right-1.5 cursor-pointer"
                                    onClick={() => setShowPasswordModal(false)}
                                />
                            </form>

                        </div>
                    </div>
                }
            </div>
        </ModalCover>
    );
});
