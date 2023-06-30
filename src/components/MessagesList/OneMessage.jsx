import { memo } from "react";

export const OneMessage = memo(({ content, ownerName, createdAt, myId, ownerId }) => {
    const time = new Date(createdAt).toLocaleTimeString([], { timeStyle: 'short' });

    return (
        <li className={`w-full p-2
            flex ${myId===ownerId && 'flex-row-reverse justify-start'}
        `}>
            <div className="border border-gray-300 rounded bg-gray-100 p-2 w-max">
                <span className="font-bold"> {ownerName} </span>
                <p> {content} </p>
            </div>

            <span className={`
                
                ${myId === ownerId ? '':''}
            `}> 
                {time}
            </span>
        </li>
    );
});