const CheckBox = ({ name, type, handleClick, isChecked }) => {
  return (
    <input
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default CheckBox;
