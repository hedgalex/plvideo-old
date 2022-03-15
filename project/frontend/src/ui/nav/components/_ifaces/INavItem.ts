import { PropsWithChildren } from 'react';

export interface INavItem extends PropsWithChildren<any> {
	itemKey: any;
	className?: string;
	activeClassname?: string;
}