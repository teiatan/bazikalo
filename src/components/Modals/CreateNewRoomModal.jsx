import { useState } from 'react';
import { ModalCover } from './ModalCover';
import { BsEyeSlash } from 'react-icons/bs';

export const CreateNewRoomModal = ({ onClose }) => {
    const [roomName, setRoomName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [textColor, setTextColor] = useState('#ffffff');
    const [isPrivate, setIsPrivate] = useState(false);
    const [passwordType, setPasswordType] = useState('password');

    const handleRoomNameChange = e => {
        setRoomName(e.target.value);
    };

    const handleBackgroundColorChange = e => {
        setBackgroundColor(e.target.value);
    };

    const handleTextColorChange = e => {
        setTextColor(e.target.value);
    };

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };

    return (
        <ModalCover onClose={onClose}>
            <div className="flex flex-col gap-5 w-3/4">
                <p className="text-center">Нова кімната</p>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Введіть назву кімнати ..."
                    value={roomName}
                    onChange={handleRoomNameChange}
                />
                <div className="flex justify-around">
                    <div>
                        <input
                            type="radio"
                            id="public"
                            name="typeroom"
                            checked={!isPrivate}
                            onChange={() => setIsPrivate(false)}
                        />
                        <label htmlFor="public">Публічна</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="private"
                            name="typeroom"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(true)}
                        />
                        <label htmlFor="private">Приватна</label>
                    </div>
                </div>
                {isPrivate && (
                    <div className="relative">
                        <p>Створіть ключ для приватної кімнати</p>
                        <input
                            type={passwordType}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <BsEyeSlash
                            onClick={togglePassword}
                            className="absolute bottom-8 right-2 cursor-pointer"
                        />
                        <p className="text-sm">
                            *Після створення кімнати ключ змінити не можна
                        </p>
                    </div>
                )}
                <p>Оберіть вид вашой кімнати</p>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-8">
                            <span>Колір фону</span>
                            <input
                                type="color"
                                className="w-10 h-10 rounded-full"
                                value={backgroundColor}
                                onChange={handleBackgroundColorChange}
                            />
                        </div>
                        <div className="flex items-center gap-8">
                            <span>Колір тексту</span>
                            <input
                                type="color"
                                className="w-10 h-10 rounded-full"
                                value={textColor}
                                onChange={handleTextColorChange}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <span
                            className="px-4 py-2 border rounded flex-grow min-w-[80px] font-bold"
                            style={{
                                color: textColor,
                                backgroundColor: backgroundColor,
                            }}
                        >
                            {roomName.toLocaleUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="px-4 py-2 border rounded bg-black text-white">
                        Створити кімнату
                    </button>
                </div>
            </div>
        </ModalCover>
    );
};
