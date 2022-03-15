import { TParams } from '../_types/TParams';
import { TQuery } from '../_types/TQuery';
import { TCookies } from '../_types/TCookies';

export interface IRequestProps {
  params: TParams;
  query: TQuery;
  cookies: TCookies;
  request: any;
  response: any;
}