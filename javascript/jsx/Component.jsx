export class Mixin {

    constructor()
    {

    }

    componentWillMount()
    {

    }

    componentDidMount()
    {

    }

    componentWillReceiveProps(nextProps)
    {

    }

    componentWillUpdate(nextProps, nextState)
    {

    }

    componentDidUpdate(prevProps, prevState)
    {

    }

    componentWillUnmount()
    {

    }
}

export class Component extends React.Component {

    constructor(props)
    {
        this.mixins = [];
    }

    addMixin(mixin)
    {
        this.mixins.push(mixin);
        mixin.component = this;
    }

    componentWillMount()
    {
        this.mixins.forEach( function(mixin) {
            mixin.componentWillMount();
        });
    }

    componentDidMount()
    {
        this.mixins.forEach( function(mixin) {
            mixin.componentDidMount();
        });
    }

    componentWillReceiveProps(nextProps)
    {
        this.mixins.forEach( function(mixin) {
            mixin.componentWillReceiveProps(nextProps);
        });
    }

    componentWillUpdate(nextProps, nextState)
    {
        this.mixins.forEach( function(mixin) {
            mixin.componentWillUpdate(nextProps, nextState);
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        this.mixins.forEach( function(mixin) {
            mixin.componentDidUpdate(prevProps, prevState);
        });
    }

    componentWillUnmount()
    {
        this.mixins.forEach( function(mixin) {
            mixin.componentWillUnmount();
        });
    }
}
