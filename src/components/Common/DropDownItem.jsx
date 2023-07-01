import PropTypes from "prop-types";

export const DropDownItem = ({
  itemStyles,
  iconStyles,
  textStyles,
  onClick,
  text,
  children,
}) => {
  return (
    <li className={`${itemStyles}`}>
      <button type="button" className="flex items-center" onMouseDown={onClick}>
        {children && (
          <div className={`flex justify-center items-center ${iconStyles}`}>
            {children}
          </div>
        )}
        <p className={`${textStyles}`}>{text}</p>
      </button>
    </li>
  );
};

DropDownItem.propTypes = {
  itemStyles: PropTypes.string,
  iconStyles: PropTypes.string,
  textStyles: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.node,
};
