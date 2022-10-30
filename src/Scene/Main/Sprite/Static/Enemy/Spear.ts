import GameSprite from '../../GameSpriteInterface';
import EnemyGameObject from './EnemyGameObject';

export default class Spear extends EnemyGameObject implements GameSprite {
  public static key = 'Spear';

  private initialPosition: number;

  private speed: number = 2;

  private isStop: boolean = false;

  private stopCounter: number = 0;

  private maxDistance: number = 8;

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    super(scene, x, y, 'spearImage');

    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.body.setImmovable();

    this.type = angle === 0 || angle === 180 ? 'y' : 'x';
    this.setAngle(angle);

    const offsetY = 4;
    const offsetX = 4;

    if (Math.abs(angle) === 180) { // V
      this.x -= offsetX;
      this.y += offsetY;
    } else if (angle === -90 || angle === 270) { // <
      this.x -= offsetX;
      this.y -= offsetY;
      this.setHorizontalBody();
    } else if (angle === 0) { // ^
      this.x += offsetX;
      this.y -= offsetY;
    } else if (angle === 90) { // >
      this.x += offsetX;
      this.y += offsetY;
      this.setHorizontalBody();
    }

    this.initialPosition = this.getAxisPosition();

    // 5 32
    this.setCrop(0, 0, 5, 12);
  }

  private setHorizontalBody(): void {
    this.body.setSize(this.body.height, this.body.width);
  }

  private getAxisPosition(): number {
    return this[this.type];
  }

  public update(): void {
    if (this.stopCounter > 50) {
      this.isStop = false;
      this.speed *= -1;
      this.stopCounter = 0;
    }

    if (this.isStop) {
      this.stopCounter += 1;
      return;
    }

    if (this.isFarEnough()) {
      this.isStop = true;
      this.fixOffeset();
      this.setCrop(0, 0, 5, this[this.type] - this.initialPosition + 20);
      return;
    }

    this[this.type] += this.speed;
    this.setCrop(0, 0, 5, this[this.type] - this.initialPosition + 20);
  }

  private isFarEnough(): boolean {
    return Math.abs(this[this.type] - this.initialPosition) > this.maxDistance;
  }

  private fixOffeset(): void {
    if (this[this.type] > this.initialPosition) {
      this[this.type] = this.initialPosition + this.maxDistance;
    } else if (this[this.type] < this.initialPosition) {
      this[this.type] = this.initialPosition - this.maxDistance;
    }
  }
}
