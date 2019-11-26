import React from 'react';

import { CategoryService } from "../Shared/Category_service";
import CategoryInput from "./CategoryInput";

class AddCategory extends React.Component {

    state = {
        isFormValid:false,
        formControls:{
            name:{
                label:"Enter the title",
                type: 'text',
                value: '',
                touched: false,
                errorMessage: 'Введите коректный title',
                valid: 'false',
                validation: {
                    required: true
                }
            },
            number:{
                label:"Enter limit",
                type: 'number',
                value: '',
                touched: false,
                errorMessage: 'Лимит должен быть выше 0',
                valid: 'false',
                validation: {
                    minValue: 1,
                    required: true
                }
            }
        }
    };

    onCategoryAdd(){
        const controls = this.state.formControls;
        const category = {
            name: controls.name.value,
            number: +controls.number.value,
        };
        this.props.onCategoryAdd(category);
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.minValue  === 1) {
            let mVal = value >= validation.minValue;
            isValid = mVal && isValid;
        }
        return isValid;
    };

    onChangeHandler(event,controlName){
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && formControls[name].touched && isFormValid;
        });
        this.setState({
            formControls, isFormValid
        });
    }


    renderInputs(){
        return Object.keys(this.state.formControls).map(((controlName,idx)=>{
            const control = this.state.formControls[controlName];
            return (
                <CategoryInput
                    key={idx}
                    control={control}
                    onChange={(event)=>{this.onChangeHandler(event,controlName)}}
                />
            )
        }))
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bordered">
                        <div className="header-block">
                            <h3 className="title">Add Category</h3>
                        </div>
                    </div>
                    <div className="card-block">
                        <form>
                            { this.renderInputs() }
                            <button disabled={!this.state.isFormValid} type="button" onClick={this.onCategoryAdd.bind(this)} className="btn btn-primary">To Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}


export default AddCategory;
