import { createController } from '../../../../../src/Scene/Main/Sprite/Player/controller';

const leftKey = { isDown: false };
const rightKey = { isDown: false };

const controller = createController(leftKey, rightKey);

describe('Controller', () => {
  test('returns an object', () => {
    expect(typeof controller).toBe('object');
  });

  test('returns 0 when no key is pressed', () => {
    leftKey.isDown = false;
    rightKey.isDown = false;
    expect(controller.move()).toBe(0);
  });

  test('returns -1 when only left key is pressed', () => {
    leftKey.isDown = true;
    rightKey.isDown = false;
    expect(controller.move()).toBe(-1);
  });

  test('returns 1 when only right key is pressed', () => {
    leftKey.isDown = false;
    rightKey.isDown = true;
    expect(controller.move()).toBe(1);
  });

  test('returns 0 when both keys are pressed', () => {
    leftKey.isDown = true;
    rightKey.isDown = true;
    expect(controller.move()).toBe(0);
  });
});
