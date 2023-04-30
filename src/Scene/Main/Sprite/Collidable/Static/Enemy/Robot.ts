import { GameItem } from '../../../../GameItem/types';
import Player from '../../../Player/Player';
import EnemyGameObject from './EnemyGameObject';
import * as EventDispatcher from '../../../../../../Service/EventDispatcher';

export default class Robot extends EnemyGameObject {
  public static key = 'Robot';

  private dangerArea: Phaser.GameObjects.Zone;

  private target: Player = null;

  constructor(scene: Phaser.Scene, gameItem: GameItem) {
    super(scene, gameItem, 'robotSpriteSheet');
    scene.physics.world.enable(this);
    this.body.setSize(15, 13);
    this.fixBodyOffset(false);

    this.y = gameItem.y - 5;

    this.dangerArea = scene.add.zone(this.x, this.y, 128, this.height);
    scene.physics.world.enable(this.dangerArea, Phaser.Physics.Arcade.DYNAMIC_BODY);

    scene.anims.create({
      key: 'robotWalk',
      frameRate: 16,
      frames: this.anims.generateFrameNumbers('robotSpriteSheet', { start: 0, end: 7 }),
      repeat: -1,
    });

    this.removeTarget();
  }

  private fixBodyOffset(isFlipped: boolean): void {
    this.body.setOffset(isFlipped ? 0 : 7, 4);
  }

  public getDangerArea(): Phaser.GameObjects.Zone {
    return this.dangerArea;
  }

  public setTarget(target: Player): void {
    this.target = target;
    this.play('robotWalk');
  }

  public removeTarget(): void {
    this.target = null;
    this.stop();
    this.setFrame(8);
  }

  private reverse(target: Player): void {
    const isFlipped = target.x < this.x;
    this.setFlipX(isFlipped);
    this.fixBodyOffset(isFlipped);
  }

  public update(): void {
    this.dangerArea.setX(this.x);

    const { touching, wasTouching } = this.dangerArea.body;

    if (touching.none && !wasTouching.none) {
      EventDispatcher.emit('playerLeavesRobotDangerArea', this);
    } else if (!touching.none && wasTouching.none) {
      EventDispatcher.emit('playerEnterRobotDangerArea', this);
    }

    if (this.target) {
      this.reverse(this.target);
      this.scene.physics.moveTo(this, this.target.x, this.y, 20);
    } else {
      this.body.setVelocity(0);
    }
  }
}