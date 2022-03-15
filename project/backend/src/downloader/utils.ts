import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

export interface IProps {
	id: number;
	url: string;
	path: string;
	headers: any;
	timeout?: number;
	onStart?: Function;
	onProgress?: Function;
	onComplete?: Function;
	onTimeout?: Function;
}

const dummyCallback = (...data) => data;

export const download = (props: IProps) => {
	const {
		id,
		url,
		path: fullPath,
		headers,
		timeout = 120,
		onStart = dummyCallback,
		onProgress = dummyCallback,
		onComplete = dummyCallback,
		onTimeout = dummyCallback,
	} = props;

	https.get(
		url, { headers },
		response => {
			if (response.statusCode === 302) {
				const { headers } = response;

				download({
					id,
					url: headers.location,
					path: fullPath,
					headers,
					timeout,
					onStart,
					onProgress,
					onComplete,
					onTimeout,
				});

				return;
			}

			if (fs.existsSync(fullPath)) {
				fs.unlinkSync(fullPath);
			}

			const dirName = path.dirname(fullPath);
			if (!fs.existsSync(fullPath)) {
				fs.mkdirSync(dirName, { recursive: true });
			}

			const file = fs.createWriteStream(fullPath);
			const { headers = {} } = response;
			const isVideo = headers['content-type'] === 'video/mp4';
			const size = isVideo ? Number(headers['content-length']): 0;

			let downloaded = 0;
			let interval;
			const startTime = new Date().getTime();

			if (size) {
				onStart(id, size);

				interval = setInterval(() => {
					const time = new Date().getTime() - startTime;
					if (time / 60000 > timeout) {
						clearInterval(interval);
						onTimeout(id);

						return;
					}
					onProgress(id, Math.floor(100 * downloaded / size));
				}, 1000);
			}

			response.on('data', data => {
				if (size) {
					downloaded += data.length;
				}
				file.write(data);
			});

			response.on('end', () => {
				if (size) {
					clearInterval(interval);
					onComplete(id, size);
				}
			});
		}
	);

};