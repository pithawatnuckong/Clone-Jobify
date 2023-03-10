const FormInput = ({ type, name, labelText, value, onChange, isDisable }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
                name={name}
				type={type}
				className="form-input"
				value={value}
				disabled={isDisable}
				onChange={onChange}
			/>
		</div>
	);
};

export default FormInput;
