import React from 'react';
import {Link} from "react-router-dom";
import Input from "../Input/Input";

class Register extends React.Component {
    state = {
        message: {
            type: 'danger',
            text: ''
        },
        isFormValid: false,
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
            },
            name: {
                type: 'text',
                value: '',
                touched: false,
                errorMessage: 'Введите коректное имя',
                valid: 'false',
                label: 'Name',
                validation: {
                    required: true
                }
            },
            agree: {
                type: 'checkbox',
                value: 'off',
                touched: false,
                errorMessage: 'Нужно соглосится с провилами',
                valid: 'false',
                label: 'I agree with the rules',
                validation: {
                    isAgree: true
                }
            }
        }
    };

    onSubmit() {
        const user = {
            "email": this.state.formControls.login.value,
            "password": this.state.formControls.password.value,
            "name": this.state.formControls.name.value
        };


        fetch("http://localhost:3200/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(user => {
                window.localStorage.setItem('user', JSON.stringify(user));
                this.props.onRegister();
            })

    }

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
        if (validation.isAgree) {
            isValid = value === 'on' && isValid;
        }
        if (validation.email) {
            isValid = this.validateEmail(value) && isValid;
        }
        if (validation.minlength) {
            isValid = value.length >= validation.minlength && isValid
        }

        return isValid;
    };

    onChangeHandler(event, controlName) {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        if (controlName === 'agree' && this.state.formControls.agree.value === 'off') {
            control.value = 'on';
        } else if (controlName === 'agree' && this.state.formControls.agree.value === 'on') {
            control.value = 'off';
        } else {
            control.value = event.target.value;
        }
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid && formControls[name].touched;
        });


        this.setState({
            formControls, isFormValid
        });
    }

    // check email is busy
    onBlurHandler(event, controlName) {
        const email = this.state.formControls[controlName].value;
        if (this.validateEmail(email)) {
            fetch(`http://localhost:3200/users?email=${email}`)
                .then(response => response.json())
                .then(user => user[0])
                .then(user => {
                    if (user) {
                        const formControls = {...this.state.formControls};
                        formControls.login.valid = false;
                        this.setState({
                            formControls
                        });
                        this.showMessage('danger', 'Такого пользвателя сушествует!')
                    } else {
                        this.showMessage('success', 'Email свободен')
                    }
                })
        }


    }

    // check email is busy

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

                    onBlur={event => {
                        this.onBlurHandler(event, controlName)
                    }}
                />
            )
        })
    }


    render() {
        return (
            <div className="auth-content">
                <p className="text-xs-center">Registration for access</p>
                <form>

                    {
                        this.state.message.text ?
                            <div
                                className={'alert alert-' + this.state.message.type}>{this.state.message.text}</div> : null
                    }

                    {this.renderInputs()}

                    <div className="form-group">
                        <button disabled={!this.state.isFormValid} onClick={this.onSubmit.bind(this)} type="button"
                                className="btn btn-block btn-primary">Register!
                        </button>
                    </div>
                    <div className="form-group">
                        <p className="text-muted text-xs-center">
                            Already have an account?
                            <Link to={'/login'}>
                                Sing in!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>


        )
    }
}


export default Register;
