export const DropDownItem = ({
    itemStyles,
    iconStyles,
    textStyles,
    onClick,
    iconNode,
    text,
    children,
}) => {
    return (
        <li className={`${itemStyles}`}>
            <button
                type="button"
                className="flex items-center"
                onClick={onClick}
            >
                {children && (
                    <div
                        className={`flex justify-center items-center ${iconStyles}`}
                    >
                        {children}
                    </div>
                )}
                <p className={`${textStyles}`}>{text}</p>
            </button>
        </li>
    );
};
