import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/AppContext";
import { Alert, FormInput, FormSelect } from "../../components";

const AddJob = () => {
	const {
		isLoading,
		isEditing,
		showAlert,
		displayAlert,
		clearAlert,
		position,
		company,
		jobLocation,
		status,
		jobType,
		statusOptions,
		jobTypeOptions,
		handleChange,
		clearHandler,
		createJob,
	} = useAppContext();

	const onChangeHandler = (evt) => {
		const name = evt.target.name;
		const value = evt.target.value;

		handleChange({ name, value });

		if (showAlert) {
			clearAlert();
		}
	};

	const onSubmitHandler = (evt) => {
		evt.preventDefault();

		if (!position.trim() || !company.trim() || !jobLocation.trim()) {
			displayAlert("Please provide all values");
			return;
		}
		if (isEditing) return;
		createJob({ position, company, jobLocation, status, jobType });
	};

	const onClearHandler = (evt) => {
		evt.preventDefault();
		clearHandler();
		console.log("Clear button");
	};

	return (
		<Wrapper>
			<form className="form">
				<h3>{isEditing ? "Edit job" : "Add job"}</h3>
				{showAlert && <Alert />}

				<div className="form-center">
					<FormInput
						type="text"
						name="position"
						labelText="Position"
						value={position}
						onChange={onChangeHandler}
					/>
					<FormInput
						type="text"
						name="company"
						labelText="company"
						value={company}
						onChange={onChangeHandler}
					/>
					<FormInput
						type="text"
						name="jobLocation"
						labelText="location"
						value={jobLocation}
						onChange={onChangeHandler}
					/>
					<FormSelect
						options={jobTypeOptions}
						value={jobType}
						name="jobType"
						labelText="job type"
						onChange={onChangeHandler}
					/>
					<FormSelect
						options={statusOptions}
						value={status}
						name="status"
						labelText="status"
						onChange={onChangeHandler}
					/>
					<div className="btn-container">
						<button
							className="btn btn-block clear-btn"
							type="clear"
							onClick={onClearHandler}
							disabled={isLoading}
						>
							clear
						</button>
						<button
							className="btn btn-block submit-btn"
							type="submit"
							onClick={onSubmitHandler}
							disabled={isLoading}
						>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
