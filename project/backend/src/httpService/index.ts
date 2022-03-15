import * as cookieParser from 'cookie-parser';
import { has, keys, map } from 'lodash';
import { IResponseHandler } from './_ifaces/IResponseHandler';
import { IRequestProps } from './_ifaces/IRequestProps';
import { IHttpService } from './_ifaces/IHttpService';
import { TQuery } from './_types/TQuery';
import { TParams } from './_types/TParams';
import { TCookies } from './_types/TCookies';
import { TRoutes } from './_types/TRoutes';
import { EMethod } from './_enums/EMethod';
import {
	HttpException,
	NotFoundException,
	UnsupportedMediaTypeException,
	BadRequestException,
	GoneException,
} from './exceptions';

const Service = (): IHttpService => {
	let service = false;
	const handler = (pageHandler: IResponseHandler<any>) => (request: any, response: any) => {
		if (!pageHandler) {
			return null;
		}

		const { params = {} as TParams, query = {} as TQuery, cookies } = request;
		pageHandler({
			params,
			query,
			request,
			response,
			cookies
		})
			.then((result) => {
				response.send({
					success: true,
					data: result
				});
			})
			.catch((error: HttpException) => {
				response.status(error?.status || 404);
				response.send({
					success: false,
					error: error?.message || ''
				});
			});
	};

	/**
	 * @param {any} app ExpressJS application
	 * @param {number} [port] Web port number
	 * @param {any[]} [routes] ExpressJS routes
	 */
	const run = (app: any, port: number = 3000, routes: any = {}) => {
		if (service) {
			return;
		}

		app.use(cookieParser());

		map(keys(routes), (path: string) => {
			const responseHandler = routes[path];

			if (!has(responseHandler, 'method')) {
				app.use(path, responseHandler);
				return;
			}

			const method: EMethod = responseHandler?.method || EMethod.GET;
			app[method]?.(path, handler(responseHandler));
		});

		app.listen(port, () => {
			console.log(`Listening at http://localhost:${port}`)
		});

		service = true;
	};

	return { run };
};

const HttpService = Service();

export {
	HttpService,
	TQuery,
	TParams,
	TCookies,
	TRoutes,
	EMethod,
	IResponseHandler,
	IRequestProps,
	HttpException,
	NotFoundException,
	UnsupportedMediaTypeException,
	BadRequestException,
	GoneException,
};
