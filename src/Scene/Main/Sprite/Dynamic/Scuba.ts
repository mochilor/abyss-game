import Phaser from 'phaser';
import RoomName from '../../Map/RoomName';
import GameObject from '../GameObject';
import GameSprite from '../GameSpriteInterface';

export default class Scuba extends GameObject implements GameSprite {
  public static key = 'Scuba';

  constructor(scene: Phaser.Scene, x: number, y: number, roomName: RoomName, uuid: string) {
    super(scene, x, y, 'objects', roomName, uuid);

    scene.physics.world.enable(this);
    scene.add.existing(this);

    scene.anims.create({
      key: 'scuba',
      frameRate: 7,
      frames: this.anims.generateFrameNumbers('objects', { start: 3, end: 5 }),
      repeat: -1,
      yoyo: true,
    });

    this.play('scuba');
  }
}
