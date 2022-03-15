import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
	public status = 400;

	constructor(error = 'Bad Request Exception') {
		super(error);
		this.status = 400;
	}
}