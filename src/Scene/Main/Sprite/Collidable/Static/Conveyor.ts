import { GameItem } from '../../../GameItem/types';
import GameObject from '../../GameObject';

export default class Conveyor extends GameObject {
  public static key = 'Conveyor';

  private direction: integer;

  constructor(scene: Phaser.Scene, gameItem: GameItem) {
    super(scene, gameItem);
    this.setFrame('conveyor_00');

    scene.physics.world.enable(this);
    this.body.setImmovable();

    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;

    this.direction = this.getProperty('reverse')?.value ? -1 : 1;

    const frameRate = 36;

    scene.anims.create({
      key: 'conveyor-wheel-left',
      frames: this.anims.generateFrameNames(
        'sprites',
        {
          prefix: 'conveyor_',
          end: 3,
          zeroPad: 2,
        },
      ),
      frameRate,
      repeat: -1,
    });

    scene.anims.create({
      key: 'conveyor-center',
      frames: this.anims.generateFrameNames(
        'sprites',
        {
          prefix: 'conveyor_',
          start: 4,
          end: 7,
          zeroPad: 2,
        },
      ),
      frameRate,
      repeat: -1,
    });

    scene.anims.create({
      key: 'conveyor-wheel-right',
      frames: this.anims.generateFrameNames(
        'sprites',
        {
          prefix: 'conveyor_',
          start: 8,
          end: 11,
          zeroPad: 2,
        },
      ),
      frameRate,
      repeat: -1,
    });
  }

  public setup(previousConveyor: Conveyor | null, nextConveyor: Conveyor | null): void {
    let animationKey = 'conveyor-center';

    if (
      !previousConveyor
      || previousConveyor.x < this.x - this.width
      || previousConveyor.y !== this.y
      || (this.direction !== previousConveyor.direction)
    ) {
      animationKey = 'conveyor-wheel-left';
    } else if (
      !nextConveyor
      || nextConveyor.x > this.x + this.width
      || nextConveyor.y !== this.y
      || (this.direction !== nextConveyor.direction)
    ) {
      animationKey = 'conveyor-wheel-right';
    }

    if (this.direction > 0) {
      this.play(animationKey);
      return;
    }

    this.playReverse(animationKey);
  }

  public speed(): integer {
    return this.direction * 50;
  }
}
