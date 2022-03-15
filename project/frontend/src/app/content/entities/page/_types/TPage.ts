import * as React from 'react';
import { IPageProps } from '../_ifaces/IPageProps';
import { IPageTitle } from '../components/PageTitle/_ifaces/IPageTitle';
import { IPageContent } from '../components/PageContent/_ifaces/IPageContent';
import { IPageMoreButton } from '../components/PageMoreButton/_ifaces/IPageMoreButton';

export type TPage = React.FC<IPageProps> & {
	Title?: React.FC<IPageTitle>;
	Content?: React.FC<IPageContent>;
	MoreButton?: React.FC<IPageMoreButton>;
}