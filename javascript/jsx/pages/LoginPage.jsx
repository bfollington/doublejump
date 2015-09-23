import data from "mixins/data";
import connect from "mixins/connect";

import API from "API";
import page from "page";

import {Input, Button} from "components/input/Input.jsx";

var React = require("react");

@connect(
    state => ({})
)
@data(
    props => []
)
export class LoginPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            errorText: null
        };
    }

    onSubmit(e) {
        console.log("Submitted", this.refs.email.val(), this.refs.password.val());
        this.setState({
            errorText: ""
        });

        API.auth(this.refs.email.val(), this.refs.password.val(), res => {
            console.log(res);

            if (res.success) {
                page("/concepts/dashboard");
            } else {
                this.setState({
                    errorText: res.error
                });
            }
        });

        e.preventDefault();
    }

    render() {
        return (
            <div className="box">
                <h3>Login</h3>

                <form action="/login" method="post" onSubmit={this.onSubmit.bind(this)}>

                    { this.state.errorText }

                    <Input ref="email" label="Email" type="email" placeholder="me@website.com" required>
                        The email you signed up with
                    </Input>
                    <Input ref="password" label="Password" type="password" placeholder="secret1234" required></Input>

                    <p className="center-text">
                        <Button type="submit">Login</Button>
                    </p>

                </form>
            </div>
        );
    }
}
