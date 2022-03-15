import { isUndefined, omitBy } from 'lodash';
import { IEpisode } from '~shared/data/_ifaces/IEpisode';
import { EEpisodesFields } from '../_enums/EEpisodesFields';
import { IEpisodesFields } from '../_ifaces/IEpisodesFields';

export const episodesConvertor = async (data: Partial<IEpisode>): Promise<Partial<IEpisodesFields>> => {
  return omitBy({
    [EEpisodesFields.id]: data.id,
    [EEpisodesFields.imdbId]: data.imdbId,
    [EEpisodesFields.showId]: data.showId,
    [EEpisodesFields.title]: data.title,
    [EEpisodesFields.imagePreview]: data.imagePreview,
    [EEpisodesFields.imageFull]: data.imageFull,
    [EEpisodesFields.release]: data.release,
    [EEpisodesFields.ratingImdb]: data.ratingImdb,
    [EEpisodesFields.votedImdb]: data.votedImdb,
  }, isUndefined);
};