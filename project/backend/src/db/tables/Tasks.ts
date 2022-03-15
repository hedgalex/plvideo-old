import { ITable } from './_ifaces/ITable';

class Tasks implements ITable {
	readonly NAME = 'tasks';

	readonly id = 'id';
	readonly name = 'name';
	readonly showname = 'showname';
	readonly origin_id = 'origin_id';
	readonly episode = 'episode';
	readonly season = 'season';
	readonly title = 'title';
	readonly image = 'image';
	readonly path = 'path';
	readonly url = 'url';
	readonly progress = 'progress';
	readonly size = 'size';
	readonly status_id = 'status_id';
	readonly start = 'start';

	field = (fieldName: string) => `${this.NAME}.${this[fieldName]}`
}

const TASKS = new Tasks();

export { TASKS };