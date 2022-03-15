import { EShowType } from '../_enums/EShowType';

export interface IShow {
  id: number,
  name: string;
  showname?: string;
  title: string;
  image?: string;
  description?: string;
  type: EShowType;
}