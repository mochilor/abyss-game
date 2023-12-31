import Phaser from 'phaser';
import { GameItem } from '../../../GameItem/types';
import GameObject from '../../GameObject';
import * as EventDispatcher from '../../../../../Service/EventDispatcher';

export default class Door extends GameObject {
  public static key = 'Door';

  private level: number;

  private locks: Phaser.GameObjects.Rectangle[] = [];

  private coinCounter: number = 0;

  private isLocked: boolean = true;

  constructor(scene: Phaser.Scene, gameItem: GameItem) {
    super(scene, gameItem);
    this.setFrameFromLevel();

    scene.physics.world.enable(this);
    this.body.setImmovable();

    this.level = this.getProperty('level').value as number;

    this.setupLocks(scene);
  }

  private setFrameFromLevel(): void {
    const frames = {
      cave: 0,
      pyramid: 1,
      base: 2,
    };
    const level = this.gameItem.roomName.zone();
    this.setFrame(`blocks_${frames[level]}`);
  }

  private setupLocks(scene: Phaser.Scene): void {
    const lockDistance = 4;
    const topLeft = this.getTopLeft();
    const initialX = topLeft.x + lockDistance;
    let x = initialX;
    let y = topLeft.y + lockDistance;
    const locksPerRow = 5;

    for (let n = 0; n < this.level; n += 1) {
      this.locks.push(scene.add.rectangle(x, y, 2, 2, 0x000000, 0.3));
      x += lockDistance;
      if (this.locks.length % locksPerRow === 0) {
        x = initialX;
        y += lockDistance;
      }
    }
  }

  public unlock(): void {
    if (!this.isLocked) {
      return;
    }

    this.coinCounter += 1;

    this.locks[this.coinCounter - 1].setFillStyle(0xffffff);

    if (this.coinCounter >= this.level) {
      // cool animation here!
      this.isLocked = false;
    }
  }

  public open(): void {
    if (this.isLocked) {
      return;
    }

    // Add animation here!
    for (let n = 0; n < this.locks.length; n += 1) {
      this.locks[n].destroy();
      delete this.locks[n];
    }

    EventDispatcher.emit('doorOpen');

    this.destroy(); // take care of references to free memory!
  }
}
