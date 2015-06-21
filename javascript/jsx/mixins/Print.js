export var Print = {};

Print.print = function() {
    console.log(this);
};

Print.componentDidMount = function() {
    console.log("Hello from print mixin");
}
