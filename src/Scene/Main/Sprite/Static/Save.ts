import Phaser from 'phaser';
import RoomName from '../../Map/RoomName';
import GameObject from '../GameObject';
import GameSprite from '../GameSpriteInterface';

export default class Save extends GameObject implements GameSprite {
  public static key = 'Save';

  constructor(scene: Phaser.Scene, x: number, y: number, roomName: RoomName, uuid: string) {
    super(scene, x, y, 'objects', roomName, uuid);

    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.setFrame(7);
  }

  public resetBody() {
    this.body.enable = true;
    this.visible = true;
  }
}
