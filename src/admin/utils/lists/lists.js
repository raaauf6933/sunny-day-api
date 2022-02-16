export function isSelected(data, list, compare) {
  return !!list.find((listElement) => compare(listElement, data));
}

export function add(data, list) {
  return [...list, data];
}

export function addAtIndex(data, list, index) {
  return [...list.slice(0, index), data, ...list.slice(index)];
}

export function move(data, list, compare, index) {
  return addAtIndex(data, remove(data, list, compare), index);
}

export function update(data, list, compare) {
  const index = list.findIndex((element) => compare(data, element));

  return updateAtIndex(data, list, index);
}

export function updateAtIndex(data, list, index) {
  if (!index.toFixed) {
    throw new Error("Index is not a number");
  }
  return addAtIndex(data, removeAtIndex(list, index), index);
}

export function remove(data, list, compare) {
  return list.filter((listElement) => !compare(listElement, data));
}

export function removeAtIndex(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}

export function toggle(data, list, compare) {
  return isSelected(data, list, compare)
    ? remove(data, list, compare)
    : add(data, list);
}
