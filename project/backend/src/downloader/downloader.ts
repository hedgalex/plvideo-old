import { EProvider } from '~shared/_enums/EProvider';
import { EStatus } from '~shared/_enums/EStatus';
import { dbManager } from '~server/db/DBManager';
import { config } from '~server/config';
import { download } from './utils';

const run = async (): Promise<string> => {
	const tasksDAO = dbManager.getTasksDAO();
	const idleTask = await tasksDAO.getIdleTask();
	if (!idleTask) {
		return;
	}

	const {
		id,
		url = null,
		path: moviePath = null,
	} = idleTask;

	if (!url || !moviePath) {
		throw new Error(`No URL ${url} or PATH ${moviePath}`);
	}

	const headers = config.getHeaders(EProvider.ORORO);
	const timeout = config.getDownloadTimeout();
	const videoPath = `${moviePath}.mp4`;
	const subtitlePath = `${moviePath}.en.srt`;

	//Download video
	download({
		id,
		url,
		path: videoPath,
		timeout,
		headers,
		onStart: (id: number, size: number) => {
			tasksDAO.setSize(id, size).then();
			console.log('Started loading', moviePath);
		},
		onProgress: (id: number, progress: number) => {
			tasksDAO.setProgress(id, progress).then();
		},
		onComplete: (id: number) => {
			tasksDAO.setStatus(id, EStatus.READY).then();
			tasksDAO.setProgress(id, 100).then();
			console.log('Completed loading', moviePath);
		},
		onTimeout: (id: number) => {
			tasksDAO.setStatus(id, EStatus.IDLE).then();
			console.error('Escape on timeout', videoPath);
		},
	});

	//Download subtitles
	download({
		id,
		url: `${url}_subtitle/en`,
		path: subtitlePath,
		headers,
		onComplete: () => {
			console.log(`Subtitles downloaded ${subtitlePath}`);
		},
	});

	return;
};

const INTERVAL = config.getDownloadInterval() || 5000;
const onStartDownloader = async () => {

	const tasksDAO = dbManager.getTasksDAO();
	await tasksDAO.reset();

	setInterval(() => {
		tasksDAO.getInProgressTask().then(
			(inProgress) => {
				if (!inProgress) {
					run();
				}
			}
		);
	}, INTERVAL);
};

onStartDownloader()
	.then()
	.catch(error => {
		console.error(error);
	});