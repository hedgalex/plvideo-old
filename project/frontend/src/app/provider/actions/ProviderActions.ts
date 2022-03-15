import { EProvider } from '~shared/_enums/EProvider';
import {
	PROVIDER_LOAD,
	PROVIDER_LOAD_SUCCESS,
	PROVIDER_LOAD_FAILED,
	PROVIDER_CHANGE,
	PROVIDER_CHANGE_SUCCESS,
	PROVIDER_CHANGE_FAILED,
} from '../consts/ProviderConsts';

/** Loading */
export const providerLoadAction = () => ({
	type: PROVIDER_LOAD
});

export const providerLoadSuccessAction = (provider: EProvider) => ({
	type: PROVIDER_LOAD_SUCCESS,
	payload: { provider },
});

export const providerLoadFailedAction = (error: any) => ({
	type: PROVIDER_LOAD_FAILED,
	payload: { error },
});

/** Change */
export const providerChangeAction = (provider: EProvider) => ({
	type: PROVIDER_CHANGE,
	payload: { provider }
});

export const providerChangeSuccessAction = (provider: EProvider) => ({
	type: PROVIDER_CHANGE_SUCCESS,
	payload: { provider },
});

export const providerChangeFailedAction = (error: any) => ({
	type: PROVIDER_CHANGE_FAILED,
	payload: { error },
});