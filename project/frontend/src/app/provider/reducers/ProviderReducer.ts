import { EProvider } from '~shared/_enums/EProvider';
import {  
	PROVIDER_CHANGE_FAILED, 
	PROVIDER_CHANGE_SUCCESS, 
	PROVIDER_LOAD_FAILED, 
	PROVIDER_LOAD_SUCCESS
} from '../consts/ProviderConsts';

export const providerReducer = (provider = null as EProvider, { type, payload }): EProvider => {
	switch (type) {
		case PROVIDER_LOAD_SUCCESS: {
			const { provider } = payload;
			return provider;
		}
		case PROVIDER_LOAD_FAILED: {
			return provider;
		}
		case PROVIDER_CHANGE_SUCCESS: {
			const { provider } = payload;
			return provider;
		}
		case PROVIDER_CHANGE_FAILED: {
			//Error
			return provider;
		}
		default: {
			return provider;
		}
	}
};
