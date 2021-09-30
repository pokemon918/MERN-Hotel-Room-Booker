export function filterByType(rooms, type) {
  if (type !== "all") {
    return rooms.filter(
      (room) => room.type.toLowerCase() === type.toLowerCase()
    );
  } else {
    return rooms;
  }
}
