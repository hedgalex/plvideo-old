import * as fs from 'fs';
import * as path from 'path';
import { IShow } from '~shared/_ifaces/IShow';
import { IConfig } from '~server/config';
import { IParams } from '../_ifaces/IParams';
import { IProvider } from '../_ifaces/IProvider';
import { EParamTypes } from '../_enums/EParamTypes';

const ENCODING = 'utf-8';

const readFile = (fileName: string, defaultValue: any): Promise<any> => 
  new Promise((resolve) => {
    const filePath = path.join(__dirname, fileName);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, ENCODING));

      resolve(data);
    } else {
      resolve(defaultValue);
    }
  });

export class MockProvider implements IProvider {  
  readonly config: IConfig;
  
  constructor(config: IConfig) {
    this.config = config;
  }

  scan(params: IParams): Promise<IShow[]> {
    const { type = EParamTypes.TVSHOWS } = params;
    const fileName = `./data/scan_${type}.json`;

    return readFile(fileName, []) as Promise<IShow[]>;
  }

  details(params: IParams): Promise<IShow> {
    const { name = '' } = params;
    const fileName = `./data/details_${name}.json`;

    return readFile(fileName, {}) as Promise<IShow>;
  }

  searchByText(text: string): Promise<IShow[]> {
    const fileName = `./data/search_${text}.json`;

    return readFile(fileName, []) as Promise<IShow[]>;
  }

  getDownloadInfo(key: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
