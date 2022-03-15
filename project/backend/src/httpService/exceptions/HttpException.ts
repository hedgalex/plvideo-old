export class HttpException extends Error {
	public status = 0;

	constructor(error = '') {
		super(error);
	}
}