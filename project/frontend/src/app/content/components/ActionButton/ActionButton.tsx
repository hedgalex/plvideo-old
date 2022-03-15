import * as React from 'react';
import { cx } from '~utils';
import { EStatus } from '~shared/_enums/EStatus';
import { IActionButton } from './_ifaces/IActionButton';
import { ACTION_BUTTON_STATUS_TO_ICON_MAP } from './consts/ActionButtonConsts';
import styles from './ActionButton.less';

export const ActionButton: React.FC<IActionButton> = (props) => {
	const {
		className,
		status = EStatus.NO_STATUS,
		onClick = () => {},
	} = props;
	return (
		<button 
			className={cx(styles.action, className)} 
			onClick={() => {onClick()}}
		>
			{ACTION_BUTTON_STATUS_TO_ICON_MAP[status]}
		</button>
	);
};