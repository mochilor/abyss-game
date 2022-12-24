import Door from '../../Scene/Main/Sprite/Dynamic/Door';
import EventDispatcher from '../EventDispatcher';

let doorsGroup: Phaser.GameObjects.Group;

function unlock(): void {
  doorsGroup.children.iterate((door: Door) => {
    door.unlock();
  });
}

export default function listenDoorEvents(doors: Phaser.GameObjects.Group): void {
  doorsGroup = doors;
  EventDispatcher.getInstance().on('playerGotCoin', unlock);
}