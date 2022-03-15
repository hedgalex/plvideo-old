import { EStatus } from '~shared/_enums/EStatus';

export interface IActionButton {
	status: EStatus;
	className?: string;
	onClick?: Function;
}