import AppError from "../common/utils/appError.js";

// Error handling functions
export const handleMongooseCastError = (error) => {
	const message = `Invalid ${error.path} value "${error.value}".`;
	return new AppError(message, 400);
};

export const handleMongooseValidationError = (error) => {
	const errors = Object.values(error.errors).map((el) => el.message);
	const message = `${errors.join('. ')}`;
	return new AppError(message, 400);
};

export const handleMongooseDuplicateFieldsError = (error, next) => {
	console.log(error);
	// Extract value from the error message if it matches a pattern

	if (error.code === 11000) {
		const field = Object.keys(error.keyValue)[0]
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.split(/(?=[A-Z])/)
			.map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()))
			.join('');

		const value = error.keyValue[field];
		const message = `${field} "${value}" has already been used!.`;
		return new AppError(message, 409);
	} else {
		next(error);
	}
};