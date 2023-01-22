const FormSelect = ({ name, labelText, value, onChange, options }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>

			<select
				name={name}
				value={value}
				onChange={onChange}
				className="form-select"
			>
				{options?.map((opt, idx) => {
					return (
						<option key={idx} value={opt}>
							{opt}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default FormSelect;
