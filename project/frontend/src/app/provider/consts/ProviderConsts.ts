import { IState } from '~app/store/_ifaces/IState';
import { EProvider } from '~shared/_enums/EProvider';

const PROVIDER_LOAD = 'PROVIDER_LOAD';
const PROVIDER_LOAD_SUCCESS = 'PROVIDER_LOAD_SUCCESS';
const PROVIDER_LOAD_FAILED = 'PROVIDER_LOAD_FAILED';
const PROVIDER_CHANGE = 'PROVIDER_CHANGE';
const PROVIDER_CHANGE_SUCCESS = 'PROVIDER_CHANGE_SUCCESS';
const PROVIDER_CHANGE_FAILED = 'PROVIDER_CHANGE_FAILED';

export const REST_URLS = {
  provider: () => '/provider',
	changeProvider: (name: string) => `/changeProvider/${name}`,
}

export const providerSelector = (state: IState): EProvider => state.provider as EProvider;

export {
	PROVIDER_CHANGE,
	PROVIDER_CHANGE_SUCCESS, 
	PROVIDER_CHANGE_FAILED, 
  PROVIDER_LOAD,
  PROVIDER_LOAD_SUCCESS,
  PROVIDER_LOAD_FAILED,
};