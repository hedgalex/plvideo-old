import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EProvider } from '~shared/_enums/EProvider';
import { DropDown } from '~ui/dropdown/DropDown';
import { providerSelector } from '~app/provider/consts/ProviderConsts';
import { 
	providerChangeAction, 
	providerLoadAction 
} from '~app/provider/actions/ProviderActions';
import { Loader } from '../Loader/Loader';

export const ProviderPicker: React.FC = () => {
	const dispatch = useDispatch();
	const provider = useSelector(providerSelector);

	if (provider === null) {
		dispatch(providerLoadAction());

		return <Loader displayText={false} />;
	}

	const onChange = (provider: EProvider) => {
		dispatch(providerChangeAction(provider));
	};

	return (
		<DropDown defaultValue={provider} onChange={onChange}>
			<DropDown.Item value={EProvider.MOCK}>Mock</DropDown.Item>
			<DropDown.Item value={EProvider.ORORO}>Ororo.tv</DropDown.Item>
			{/* <DropDown.Item value="lostfilm">Lostfilm.tv</DropDown.Item> */}
		</DropDown> 
	);
};