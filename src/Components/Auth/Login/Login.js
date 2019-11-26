import React from 'react';
import {Link} from "react-router-dom";
import Input from '../Input/Input'


class Login extends React.Component {

    state = {
        message: {
            type: 'danger',
            text: ''
        },
        isFormValid:false,
        formControls: {
            login: {
                type: 'text',
                value: '',
                touched: false,
                errorMessage: 'Введите коректный email',
                valid: 'false',
                label: 'Login',
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                type: 'password',
                value: '',
                touched: false,
                errorMessage: 'Введите коректный пароль',
                valid: 'false',
                label: 'Password',
                validation: {
                    required: true,
                    minlength: 6
                }
            }
        }
    };

    showMessage(type, text) {
        this.setState({
            message: {
                type, text
            }
        });


        setTimeout(() => {
            this.setState({
                message: {
                    type: 'danger',
                    text: ''
                }
            });
        }, 5000)
    }

    onSubmit = () => {
        let {login, password} = this.state.formControls;
        if (login.valid && password.valid) {
            window.fetch('http://localhost:3200/users')
                .then(response => response.json())
                .then(users => {
                    let user = users.find(u => u.email === login.value);
                    if (user) {
                        if (user.password === password.value) {
                            window.localStorage.setItem('user', JSON.stringify(user));
                            this.props.onLogin();
                        } else {
                            this.showMessage('danger', 'Неверный Пароль')
                        }
                    } else {
                        this.showMessage('danger', 'Такого ползвателя не сушествует');
                    }
                })
        }
    };

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateControl = (value, validation) => {

        if (!validation) {
            return true
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = this.validateEmail(value) && isValid
        }
        if (validation.minlength) {
            isValid = value.length >= validation.minlength && isValid
        }

        return isValid;
    };

    onChangeHandler(event, controlName) {

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls, isFormValid
        })
    }


    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    label={control.label}
                    validation={control.validation}
                    onChange={event => {
                        this.onChangeHandler(event, controlName)
                    }}
                />
            )
        })
    }

    render() {
        return (
            <div className="auth-content">
                <p className="text-xs-center">Sign in to work</p>
                {
                    this.state.message.text ?
                        <div className={'alert alert-' + this.state.message.type}>{this.state.message.text}</div> : null
                }
                <form>
                    {this.renderInputs()}
                    <div className="form-group">
                        <button disabled={!this.state.isFormValid} onClick={this.onSubmit.bind(this)} type="button"
                                className="btn btn-block btn-primary">Sign in!
                        </button>
                    </div>
                    <div className="form-group">
                        <p className="text-muted text-xs-center">
                            No account? <Link to={'/register'}>Sign up!</Link>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login;
