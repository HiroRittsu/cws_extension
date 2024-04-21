import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import React from 'react';

export const convertToggle2Flag = (toggles: {
  title: boolean;
  icon: boolean;
  period: boolean;
  progress: boolean;
}) => {
  return `${toggles.title ? 1 : 0}${toggles.icon ? 1 : 0}${toggles.period ? 1 : 0}${
    toggles.progress ? 1 : 0
  }`;
};

const Options = () => {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      start: new Date(2020, 1, 1, 8, 30, 0),
      end: new Date(2020, 1, 1, 17, 0, 0),
      name: 'Idea',
      id: 'Task 0',
      type: 'task',
      progress: 100,
      isDisabled: false,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
  ]);

  const handleTaskChange = (task: Task) => {
    console.log('On date change Id:' + task.id);
    task.name = `${task.start.getHours()}:${String(task.start.getMinutes()).padStart(
      2,
      '0'
    )} ~ ${task.end.getHours()}:${String(task.end.getMinutes()).padStart(2, '0')}`;
    const newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  return (
    <div style={{ width: '99%' }}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Hour}
        onDateChange={handleTaskChange}
        preStepsCount={2}
        handleWidth={5}
        // viewTask={12}
        listCellWidth={''}
        ganttHeight={0}
        columnWidth={200}
        locale={'ja-JP'}
        rowHeight={33}
        timeStep={900000}
        fontFamily={
          "proxima-nova, 'Helvetica Neue', Helvetica, Arial, sans-serif,'proxima-nova','Helvetica Neue',Helvetica,Arial,sans-serif"
        }
      />
    </div>
  );
};

export default Options;
