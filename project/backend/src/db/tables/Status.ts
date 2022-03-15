import { ITable } from './_ifaces/ITable';

class Status implements ITable {
	readonly NAME = 'status';
	readonly id = 'id';
	readonly status = 'status';

	field = (fieldName: string) => `${this.NAME}.${this[fieldName]}`
}

const STATUS = new Status();

export { STATUS };