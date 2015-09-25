export function toggle(name) {
    this.setState({
        [name]: !this.state[name]
    });
}

export function add(name, val) {
    this.setState({
        [name]: this.state[name] + val
    });
}

export function append(name, val) {
    this.setState({
        [name]: this.state[name].concat(val)
    });
}

export function remove(name, val) {

    var copy = this.state[name].slice();
    var index = copy.indexOf(val);

    if (index >= 0) {
        copy.splice(index, 1);
    }

    this.setState({
        [name]: copy
    });
}
