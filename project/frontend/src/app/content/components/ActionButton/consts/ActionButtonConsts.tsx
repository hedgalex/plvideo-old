import * as React from 'react';
import {
	AiOutlineDelete,
	AiOutlineDownload,
	AiOutlineReload,
} from 'react-icons/ai';
import { EStatus } from '~shared/_enums/EStatus';

export const ACTION_BUTTON_STATUS_TO_ICON_MAP = {
	[EStatus.NO_STATUS]: <AiOutlineDownload />,
	[EStatus.IDLE]: <AiOutlineDelete />,
	[EStatus.IN_PROGRESS]: <AiOutlineDelete />,
	[EStatus.READY]: <AiOutlineDelete />,
}