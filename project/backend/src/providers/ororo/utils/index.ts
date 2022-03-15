import { IConfig } from '~server/config';
import { EProvider } from '~shared/_enums/EProvider';

export const extractName = (url: string) => url?.substring(url?.lastIndexOf('/') + 1);

export const generateHeaders = (config: IConfig, isJSON: boolean): any => {
  const headers = {
    Cookie: config.getCookies(EProvider.ORORO),
  }
  
  if (isJSON) {
    headers['Accept'] = 'application/json';
  }

  return headers;
}