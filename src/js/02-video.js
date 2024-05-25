import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const lsTimeKey = 'videoplayer-current-time';
const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

const storedTime = JSON.parse(localStorage.getItem(lsTimeKey)) ?? 0;

player.setCurrentTime(storedTime);

const playerTimeupdateHandler = ({ seconds }) => {
  localStorage.setItem(lsTimeKey, seconds);
};

player.on('timeupdate', throttle(playerTimeupdateHandler, 1000));
