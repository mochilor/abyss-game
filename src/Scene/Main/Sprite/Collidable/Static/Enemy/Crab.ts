import EnemyGameObject from './EnemyGameObject';
import { GameItem } from '../../../../GameItem/types';

export default class Crab extends EnemyGameObject {
  public static key = 'Crab';

  private currentVelocity: number;

  private stopAt: number = null;

  constructor(scene: Phaser.Scene, gameItem: GameItem) {
    super(scene, gameItem);
    this.setFrame('crab_00');

    scene.physics.world.enable(this);
    this.setY(this.y -= 4);

    this.body.setSize(18, 12);

    const forward = parseInt(this.getProperty('orientation')?.value as string ?? '1', 10);

    this.body.setVelocityX(-24 * forward);

    scene.anims.create({
      key: 'crabWalk',
      frameRate: 12,
      frames: this.anims.generateFrameNames(
        'sprites',
        {
          prefix: 'crab_',
          start: 1,
          end: 5,
          zeroPad: 2,
        },
      ),
      repeat: -1,
    });

    scene.anims.create({
      key: 'crabStop',
      frameRate: 12,
      frames: this.anims.generateFrameNames(
        'sprites',
        {
          prefix: 'crab_',
          start: 6,
          end: 12,
          zeroPad: 2,
        },
      ),
      repeat: 0,
    });

    this.playWalkAnimation(forward === 1);
  }

  private playWalkAnimation(forward: boolean): void {
    if (forward) {
      this.play('crabWalk');
      return;
    }

    this.playReverse('crabWalk');
  }

  public update(time: number): void {
    if (
      this.body.blocked.left
      || this.body.blocked.right
      || this.body.touching.left
      || this.body.touching.right
    ) {
      this.stopAt = time;
      this.stop();
      this.setFrame('crab_00');
      if (Math.random() > 0.4) {
        this.playAfterDelay('crabStop', Math.random() * 200);
      }
    }

    if (this.stopAt && time > (this.stopAt + 1500)) {
      this.body.setVelocityX(this.currentVelocity * -1);
      this.stopAt = null;
      this.playWalkAnimation(this.currentVelocity > 1);
    }

    if (!this.stopAt) {
      this.currentVelocity = this.body.velocity.x;
    }
  }
}
