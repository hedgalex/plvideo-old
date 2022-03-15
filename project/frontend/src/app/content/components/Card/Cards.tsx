import * as React from 'react';
import { useContext } from 'react';
import { find, map } from 'lodash';
import { cx } from '~utils';
import { TasksContext } from '~tasks/context/TasksContext';
import { CardShort } from './components/CardShort/CardShort';
import { ICards } from './_ifaces/ICards';
import styles from './Cards.less';

export const Cards: React.FC<ICards> = (props: ICards) => {
	const {
		className,
		items,
    onCardClick,
    onActionClick,
  } = props;
  const { tasks } = useContext(TasksContext);

	return (
		<div className={cx(styles.container, className)}>
			{map(items, item => {
        const task = find(tasks, task => task.name === item.name);
        return (
          <CardShort
            key={item.name} 
            {...item}
            progress={task?.progress}
            status={task?.status}
            onCardClick={onCardClick}
            onActionClick={onActionClick}
          />
        )
      })}
		</div>
	);
};
