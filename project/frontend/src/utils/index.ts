import { 
  filter, 
  padStart,
  each, 
} from 'lodash';

/** joins classNames */
const cx = (...classNames) => filter(classNames, className => !!className).join(' ');

/** episode template */
const fullEpisodeCode = (season, episode) => `s${padStart(season, 2, '0')}e${padStart(episode, 2, '0')}`;

const extractHashParameters = (hash = '') => {
  const items = {};
  const params = hash.replace(/#/, '').split(/&/);
  each(params, (paramGroup) => {
    const [name, value] = paramGroup.split(/=/);
    items[name] = decodeURIComponent(value); 
  });

  return items;
}
  
export {
  extractHashParameters,
  fullEpisodeCode,
  cx,
}