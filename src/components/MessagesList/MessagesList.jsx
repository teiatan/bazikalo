import { memo, useEffect, useRef } from "react";
import { OneMessage } from "./OneMessage";
import { useUser } from "../../hooks/contextHooks";

// eslint-disable-next-line react/display-name
export const MessagesList = memo(({ messages }) => {
    const messagesRef = useRef(null);
    const {user} = useUser();
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    };

    const renderMessage = () => (
        messages.map(message => {
            const { id, owner, content, createdAt } = message;
            return (
                <OneMessage
                    key={id}
                    id={id}
                    content={content}
                    ownerId={owner.id}
                    ownerName={owner.userName}
                    createdAt={createdAt}
                    myId={user.id}
                />
            );
        })
    );

    return (
        <div>
            {/* <p className="my-10 text-center">Сьогодні</p> */}
            <div className="h-[calc(100vh-80px-80px-160px)] overflow-y-scroll ">
                <ul className="space-y-5 ml-5" ref={messagesRef}>
                    {renderMessage()}
                    <div ref={messagesRef}></div>
                </ul>
            </div>
        </div>
    );
});