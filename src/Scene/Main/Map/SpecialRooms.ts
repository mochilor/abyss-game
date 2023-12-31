import Player from '../Sprite/Player/Player';
import RoomName from './RoomName';

export default function getNewRoomNameSpecialCase(
  player: Player,
  roomName: RoomName,
): RoomName | null {
  const specialRooms = {
    '2_1': {
      left: '4_5',
      bottom: '4_7',
    },
    '4_5': {
      right: '2_1',
    },
    '4_8': {
      bottom: '4_7',
    },
    '5_8': {
      bottom: '4_7',
      left: '6_7',
    },
    '6_7': {
      right: '5_8',
      bottom: '2_1',
    },
    '7_8': {
      right: '7_8',
    },
    '2_10': {
      left: '2_12',
    },
    '3_10': {
      bottom: '3_10',
      right: '2_11',
    },
    '2_11': {
      right: '3_10',
      left: '3_10',
    },
    '2_12': {
      right: '2_10',
      bottom: '3_10',
    },
    '1_12': {
      bottom: '2_12',
    },
  };

  const specialRoom = specialRooms[roomName.getName()];

  if (!specialRoom) {
    return null;
  }

  let name = null;
  if (player.isLeavingRoomLeft() && specialRoom.left) {
    name = specialRoom.left;
  }
  if (player.isLeavingRoomRight() && specialRoom.right) {
    name = specialRoom.right;
  }
  if (player.isLeavingRoomTop() && specialRoom.top) {
    name = specialRoom.top;
  }
  if (player.isLeavingRoomBottom() && specialRoom.bottom) {
    name = specialRoom.bottom;
  }

  if (name) {
    return RoomName.fromName(name);
  }

  return null;
}
