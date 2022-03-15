import * as express from 'express';
import * as path from 'path';
import { Scan } from '~server/httpContent/content/Scan';
import { 
	HttpService, 
	TRoutes 
} from '~server/httpService';
import { Progress } from '~server/httpContent/content/Progress';
import { Details } from '~server/httpContent/content/Details';
import { SearchByText } from '~server/httpContent/content/SearchByText';
import { Task } from '~server/httpContent/tasks/Task';
import { RemoveTask } from '~server/httpContent/tasks/RemoveTask';
import { Tasks } from '~server/httpContent/tasks/Tasks';
import { Provider } from '~server/httpContent/content/Provider';
import { ChangeProvider } from '~server/httpContent/content/ChangeProvider';

const staticPath = express.static(path.join(__dirname, '..', '..', '.dist'));

const app = express();
const port = 3000;
const routes: TRoutes = {
	'/': staticPath,
	'/static': staticPath,
	'/tvshow*': staticPath,
	'/movie*': staticPath,
	'/downloads': staticPath,
	'/search': staticPath,
	'/scan(/type/:type)?(/name/:name)?(/service/:service)?': Scan,
	'/details(/service/:service)?(/:type)(/:name)': Details,
	'/progress': Progress,
	'/task(/service/:service)?/:name': Task,
	'/task/:name': RemoveTask,
	'/tasks': Tasks,
	'/searchByText*': SearchByText,
	'/provider': Provider,
	'/changeProvider/:name': ChangeProvider,
};

HttpService.run(app, port, routes);