import { useDispatch, useSelector } from 'react-redux';
import { Counter } from '../app/features/counter';
import { RootState } from '../redux/store';
import { increment } from '../redux/documentSlice';

const Content = () => {
  /*
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    console.log(tab[0].id);
    console.log(chrome.scripting);

    chrome.runtime.sendMessage({ message: 'from_contents' }, function (res) {
      // alert('Hello ' + res);
      console.log('res', res);
    });
  });
  */

  /*
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

    dispatch(increment());
  */

  return (
    <div className="fixed z-[999] bottom-2 right-2 shadow-xl border-[1px] bg-white bg-opacity-10">
      <div className="flex justify-center mt-2 text-base">Content Counter</div>
      <Counter />
    </div>
  );
};

export default Content;
