import React from 'react';

const  CategoryInput = props => {
    function isInvalid(touched,valid){
        return !valid && touched;
    }
    let randId = randID();
    return (
        <div className={isInvalid(props.control.touched,props.control.valid) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor={randId}>{props.control.label}</label>
            <input
                type={props.control.type}
                id={randId}
                className="form-control"
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props.control.touched, props.control.valid)
                    ? <span className="form-help-text">{props.control.errorMessage}</span>
                    : null
            }

        </div>
    )
};
function randID(){
    return Math.floor(Math.random() * 1000)
}
export default CategoryInput;
