import React, { useEffect, useState } from 'react';
import { BarTask } from '../../types/bar-task';
import { GanttContentMoveAction } from '../../types/gantt-task-actions';
import { Bar } from './bar/bar';
import { BarSmall } from './bar/bar-small';
import { Milestone } from './milestone/milestone';
import { Project } from './project/project';

export type TaskItemProps = {
  task: BarTask;
  arrowIndent: number;
  taskHeight: number;
  isProgressChangeable: boolean;
  isDateChangeable: boolean;
  isDelete: boolean;
  isSelected: boolean;
  rtl: boolean;
  onEventStart: (
    action: GanttContentMoveAction,
    selectedTask: BarTask,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => any;
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { task, isDelete, isSelected, onEventStart } = {
    ...props
  };
  const [taskItem, setTaskItem] = useState<JSX.Element>(<div />);
  useEffect(() => {
    switch (task.typeInternal) {
      case 'milestone':
        setTaskItem(<Milestone {...props} />);
        break;
      case 'project':
        setTaskItem(<Project {...props} />);
        break;
      case 'smalltask':
        setTaskItem(<BarSmall {...props} />);
        break;
      default:
        setTaskItem(<Bar {...props} />);
        break;
    }
  }, [task, isSelected, props]);

  return (
    <g
      onKeyDown={(e) => {
        switch (e.key) {
          case 'Delete': {
            if (isDelete) onEventStart('delete', task, e);
            break;
          }
        }
        e.stopPropagation();
      }}
      onMouseEnter={(e) => {
        onEventStart('mouseenter', task, e);
      }}
      onMouseLeave={(e) => {
        onEventStart('mouseleave', task, e);
      }}
      onDoubleClick={(e) => {
        onEventStart('dblclick', task, e);
      }}
      onClick={(e) => {
        onEventStart('click', task, e);
      }}
      onFocus={() => {
        onEventStart('select', task);
      }}
    >
      {taskItem}
    </g>
  );
};
