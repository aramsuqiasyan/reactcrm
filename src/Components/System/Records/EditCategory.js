import React from 'react';

import {CategoryService} from "../Shared/Category_service";
import CategoryInput from "./CategoryInput";

class EditCategory extends React.Component {
    state = {
        oldCatId:null,
        isFormValid: true,
        formControls: {
            name: {
                label: "Enter the title",
                type: 'text',
                value: '',
                touched: true,
                errorMessage: 'Введите коректный title',
                valid: 'false',
                validation: {
                    required: true
                }
            },
            number: {
                label: "Enter limit",
                type: 'number',
                value: '',
                touched: true,
                errorMessage: 'Лимит должен быть выше 0',
                valid: 'false',
                validation: {
                    minValue: 1,
                    required: true
                }
            }
        }
    };
    componentDidMount() {
        CategoryService.getCategories()
            .then(category=> category[0])
            .then(category=>{
                const formControls = {...this.state.formControls};
                formControls['name'].value = category.name;
                formControls['number'].value = category.number;
                this.setState({
                    formControls,
                    oldCatId:category.id
                });
            })

    }
    onCategoryAdd() {
        const controls = this.state.formControls;
        const category = {
            name: controls.name.value,
            number: controls.number.value,
        };
        this.props.onCategoryAdd(category);
    }
    onCategoryUpdate(){
        const controls = this.state.formControls;
        const category = {
            name: controls.name.value,
            number: controls.number.value,
        };
        const id  = this.state.oldCatId;
        this.props.onCategoryUpdate(category,id);
    }
    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.minValue === 1) {
            let mVal = value >= validation.minValue;
            isValid = mVal && isValid;
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
            formControls, isFormValid,
        });
    }
    renderInputs() {
        return Object.keys(this.state.formControls).map(((controlName, idx) => {
            const control = this.state.formControls[controlName];
            return (
                <CategoryInput
                    key={idx}
                    control={control}
                    value={control.value}
                    onChange={(event) => {
                        this.onChangeHandler(event, controlName)
                    }}
                />
            )
        }))
    }
    onCategoryChange(e){
        let category = this.props.categories[e.target.value];
        const formControls = {...this.state.formControls};
        formControls['name'].value = category.name;
        formControls['number'].value = category.number;
        const id = category.id;
        this.setState({
            formControls,
            oldCatId:id
        });
    }
    render() {
        return (
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bordered">
                        <div className="header-block">
                            <h3 className="title">Edit Category</h3>
                        </div>
                    </div>
                    <div className="card-block">
                        <form>
                            <label className="control-label" htmlFor="selectCategory">Select Category</label>
                            <select onChange={this.onCategoryChange.bind(this)} className="form-control" id="selectCategory"
                                    value={this.props.selectedCategory}>
                                {this.props.categories.map(((category, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={index}
                                        >
                                            {category.name}
                                        </option>
                                    )
                                }))}
                            </select>

                            {this.renderInputs()}

                            <button disabled={!this.state.isFormValid} onClick={this.onCategoryUpdate.bind(this)} type="button" className="btn btn-primary">To Update</button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}
export default EditCategory;
