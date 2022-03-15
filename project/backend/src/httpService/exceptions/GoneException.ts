import { HttpException } from './HttpException';

export class GoneException extends HttpException {
	public status = 410;

	constructor(error = 'Gone Exception') {
		super(error);
		this.status = 410;
	}
}