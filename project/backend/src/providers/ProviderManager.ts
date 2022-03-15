import { EProvider } from '~shared/_enums/EProvider';
import { IProvider } from './_ifaces/IProvider';
import { OroroProvider } from './ororo/OroroProvider';
import { MockProvider } from './mock/MockProvider';
import { config } from '~server/config';

export class ProviderManager {

	static getProvider = (provider: EProvider): IProvider => {
		switch (provider) {
			case EProvider.MOCK:
				return new MockProvider(config);
			case EProvider.ORORO:
				return new OroroProvider(config);
		}

		return null;
	};

}