import objectAssign from "object-assign";

export default function clone(obj, keys) {
    return objectAssign({}, obj, keys);
}
