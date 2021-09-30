export function filterBySearch(rooms, query) {
  return rooms.filter((room) =>
    room.name.toLowerCase().includes(query.toLowerCase())
  );
}
