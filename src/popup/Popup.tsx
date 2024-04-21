import { Counter } from '../app/features/counter';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/documentSlice';
import { RootState } from '../app/store';

function reddenPage() {
  document.querySelector<any>(
    `#GI2 > tbody > tr:nth-child(2) > td > select > option:nth-child(${3})`
  ).selected = true;
  const hourQuery = document.querySelectorAll('#H');
  const MinuteQuery = document.querySelectorAll('#M');

  const titleDay = document.querySelector<any>('#HD > tbody > tr > td > span').textContent;
  const formattedTitleDay = titleDay
    .replace('年', '-')
    .replace('月', '-')
    .replace('日', '')
    .split('(')[0];

  const firstDate: Date = new Date(
    `${formattedTitleDay} ${hourQuery[0].textContent}:${MinuteQuery[0].textContent}:00`
  );
  const secoundDate = new Date(
    `${formattedTitleDay} ${hourQuery[1].textContent}:${MinuteQuery[1].textContent}:00`
  );
  const workingTime = (secoundDate.getTime() - firstDate.getTime()) / (60 * 60 * 1000) - 0.75;
  console.log(workingTime);

  document.querySelector<any>('#RTTLCHKBX24').checked = true;
  document.querySelector<any>('#RTTLVAL24H').disabled = false;
  document.querySelector<any>('#RTTLVAL24M').disabled = false;

  document.querySelector<any>('#GI58 > tbody > tr:nth-child(2) > td > div > textarea').textContent =
    '晩御飯を食べていたため';

  console.log('send?');

  chrome.runtime.sendMessage(JSON.stringify({ deta: formattedTitleDay }));

  return 'debug?';
}

function getTitle() {
  console.log('getTitle');

  return 'debug';
}

const Popup = () => {
  console.log('Proo');

  document.body.className = 'h-[15rem]';

  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState('2');

  const [tasks, setTasks] = React.useState<Task[]>([
    {
      start: new Date(2024, 3, 21, 8, 30, 0),
      end: new Date(2024, 3, 21, 17, 0, 0),
      name: 'Idea',
      id: '0',
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

  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    console.log('hoegheo', tab);

    chrome.scripting.executeScript({
      target: { tabId: tab[0].id! },
      func: reddenPage,
    });
  });

  // message受け取り用
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    // setIncrementAmount("");
    return true;
  });

  return (
    <div
      style={{
        width: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: '100px',
        }}
      >
        CWS アシストツール
      </div>
      <Gantt
        onDateChange={handleTaskChange}
        tasks={tasks}
        viewMode={ViewMode.Hour}
        handleWidth={15}
        timeStep={900000}
        listCellWidth={incrementAmount}
        columnWidth={50}
        preStepsCount={3}
        locale={'ja-JP'}
      />
      <div
        style={{
          height: '150px',
        }}
      />
    </div>
  );
};

export default Popup;
