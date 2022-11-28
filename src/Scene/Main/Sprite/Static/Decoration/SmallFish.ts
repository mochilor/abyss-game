import GameItem from '../../../GameItem/GameItemInterface';
import RoomName from '../../../Map/RoomName';
import Fish from './Fish';
import config from '../../../../../../config/config.json';

export default class SmallFish extends Fish {
  public static key = 'SmallFish';

  private verticalSpeed: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    roomName: RoomName,
    uuid: string,
    properties: GameItem['properties'],
  ) {
    super(scene, x, y, roomName, uuid, properties, 'smallFishSpritesheet', -100);

    this.verticalSpeed = this.getProperty('verticalSpeed')?.value as number
      ?? 0.07 * (Math.random() - 0.5);
  }

  public update(): void {
    this.flipX = this.orientation < 0;
    this.x -= (this.speed * this.orientation);
    this.y += this.verticalSpeed;
    if (this.x < 0 || this.x > config.roomWidth) {
      this.orientation *= -1;
    }
  }
}