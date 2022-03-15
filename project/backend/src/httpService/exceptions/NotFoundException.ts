import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
	public status;

	constructor(error = 'Resource not found') {
		super(error);
		this.status = 404;
	}
}