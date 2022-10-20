import GameObject from '../../GameObject';
import GameSprite from '../../GameSpriteInterface';

export default class SeaWeed extends GameObject implements GameSprite {
  public static key = 'SeaWeed';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // x and y offset!
    super(scene, x + 4, y - 4, 'waterDetails');
    scene.add.existing(this);

    scene.anims.create({
      key: 'seaweed',
      frameRate: 12,
      frames: this.anims.generateFrameNumbers('waterDetails'),
      repeat: -1,
    });

    this.play('seaweed');
  }
}