const GenderRadioButton = ({ onCheckboxChange, selectedGender }) => {
  const genders = ["male", "female"];

  return (
    <div className="flex flex-row py-1">
      {genders.map((gender) => (
        <label
          key={gender}
          className={`label gap-2 ${selectedGender === gender ? "selected" : ""} cursor-pointer`}
        >
          <span className="label-text capitalize">{gender}</span>
          <input
            type="radio"
            className="radio border-slate-900"
            checked={selectedGender === gender}
            onChange={() => onCheckboxChange(gender)}
            name="gender"
          />
        </label>
      ))}
    </div>
  );
};

export default GenderRadioButton;
