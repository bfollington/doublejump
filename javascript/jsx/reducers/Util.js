import objectAssign from "object-assign";

export default function clone(obj, keys) {
    return objectAssign({}, obj, keys);
}

export function append(arr, entries) {
    return arr.slice(0).push(...entries);
}
