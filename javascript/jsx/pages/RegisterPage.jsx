import data from "mixins/data";
import connect from "mixins/connect";

import API from "API";
import page from "page";

import {Input, Button} from "components/input/Input.jsx";

import {GridRow} from "components/Layout.jsx";

var React = require("react");

@connect(
    state => ({})
)
@data(
    props => []
)
export class RegisterPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            errorText: null
        };
    }

    onSubmit(e) {
        this.setState({
            errorText: ""
        });

        var details = {
            name: this.refs.name.val(),
            surname: this.refs.surname.val(),
            username: this.refs.username.val(),
            email: this.refs.email.val(),
            password: this.refs.password.val(),
            password_confirmation: this.refs.passwordConfirmation.val(),
        };

        API.register(
            details.name,
            details.surname,
            details.username,
            details.email,
            details.password,
            details.password_confirmation,

            res => {
                if (res.success) {
                    page("/dashboard");
                } else {
                    this.setState({
                        errorText: res.error
                    });
                }
            }
        );

        e.preventDefault();
    }

    render() {
        return (
            <div className="box">
                <h3>Register</h3>

                <form onSubmit={this.onSubmit.bind(this)}>

                    { this.state.errorText }

                    <GridRow sizes={{xs: 6}}>
                        <Input ref="name" label="First Name" type="text" placeholder="Bobby" required>
                            Your first name (you know this one).
                        </Input>
                        <Input ref="surname" label="Last Name" type="text" placeholder="Testuser" required>
                            Your last name (you probably know this one too).
                        </Input>
                    </GridRow>

                    <Input ref="username" label="Username" type="text" placeholder="bobbytestuser" required>
                        What username you'll be known by (this doesn't mean much at the moment).
                    </Input>

                    <Input ref="email" label="Email" type="email" placeholder="b.testuser@website.com" required>
                        This is the email you will log in using.
                    </Input>

                    <GridRow sizes={{xs: 6}}>
                        <Input ref="password" label="Password" type="password" placeholder="secret1234" required></Input>
                        <Input ref="passwordConfirmation" label="Password Confirmation" type="password" placeholder="secret1234" required></Input>
                    </GridRow>



                    <p className="center-text">
                        <Button type="submit">Register</Button>
                    </p>

                </form>
            </div>
        );
    }
}
