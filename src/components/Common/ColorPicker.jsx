import PropTypes from "prop-types";

export const ColorPicker = ({
  name,
  id,
  colorValue,
  handleColorValue,
  inputStyles,
  labelStyles,
}) => {
  return (
    <>
      <label htmlFor={id} className={`${labelStyles}`}>
        {name}
      </label>
      <input
        type="color"
        id={id}
        className={`w-10 h-10 rounded-full ${inputStyles}`}
        value={colorValue}
        onChange={handleColorValue}
      />
    </>
  );
};

ColorPicker.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  colorValue: PropTypes.string,
  handleColorValue: PropTypes.func,
  inputStyles: PropTypes.string,
  labelStyles: PropTypes.string,
};
