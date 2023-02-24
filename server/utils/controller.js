import UnAuthenticatedError from "../errors/UnAuthenticatedError.js";

export const checkPermission = (requestUser, requestModel) => {
	if (requestUser.role === "admin") return;
	if (requestUser.userId === requestModel.createdBy.toString()) return;
	throw new UnAuthenticatedError(
		`You don't have permission to edit this job`,
	);
};
