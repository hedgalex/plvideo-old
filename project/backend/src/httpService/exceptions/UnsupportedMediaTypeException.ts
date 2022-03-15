import { HttpException } from './HttpException';

export class UnsupportedMediaTypeException extends HttpException {
	public status = 415;

	constructor(error = 'Unsupported media type exception') {
		super(error);
		this.status = 415;
	}
}