export const DropDownField = ({ children, listStyles }) => {
    return (
        <ul className={`bg-white p-[7px] border rounded ${listStyles}`}>
            {children}
        </ul>
    );
};
