import React from 'react'


class Input extends React.Component {
    isInvalid(touched, valid) {
        return !valid && touched;
    }

    render() {
        const inputType = this.props.type || 'text';
        let cls = ["form-control", "underlined"];
        const htmlFor = `${inputType}-${Math.random()}`;
        if (this.isInvalid(this.props.touched, this.props.valid)) {
            cls.push('invalid');
        }
        if (inputType === 'checkbox') {
            return (
                <div className="form-group">
                    <label htmlFor="agree">
                        <input
                            className="checkbox"
                            id="agree"
                            type="checkbox"
                            onChange={this.props.onChange}
                        />
                        <span>{this.props.label}</span>
                    </label>
                    <br/>
                    {
                        this.isInvalid(this.props.touched, this.props.valid)
                            ? <span style={{color: 'red'}}>{this.props.errorMessage}</span>
                            : null
                    }
                </div>
            )
        } else {
            return (
                <div className={'form-group ' + (!this.props.valid ? 'has-error' : null)}>
                    <label htmlFor={htmlFor}>{this.props.label}</label>
                    <input
                        type={inputType}
                        className={cls.join(' ')}
                        id={htmlFor}
                        placeholder={"Write your " + this.props.label}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                    {
                        this.isInvalid(this.props.touched, this.props.valid)
                            ? <span style={{color: 'red'}}>{this.props.errorMessage}</span>
                            : null
                    }
                </div>
            )
        }

    }
}


export default Input;
