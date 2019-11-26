import React from 'react';
import {EventService} from "../Shared/Event_service";

class Message {
    constructor(type,text){
        this.type = type;
        this.text = text;
    }
}
class AddEvent extends React.Component {

    state = {
        message:{
            type:'success',
            text:''
        },
        isFormValid:false,
        categoryId:0,
        eventType:'income',
        formControls:{
            type:['income','outcome'],
            amount:{
                value:0,
                touched:false,
                valid:false,
                errorMessage:'Лимит должен быть ровно или больше 0'
            }
        }
    };
    showMessage(type,text){
        const message = new Message('alert-'+type,text);
        this.setState({message});
        setTimeout(()=>{
            const message = new Message(type,'');
            this.setState({message});
        },5000)
    }
    upperCaseFirst(str){
        return (str[0].toUpperCase() + str.slice(1).toLowerCase());
    }
    renderRadioButtons(){
        return this.state.formControls.type.map((radio,index)=>{
            return (
                <div key={index}>
                    <label>
                        <input onChange={this.onRadioButtonChange.bind(this)} className="radio"  name="radios" type="radio" value={radio} defaultChecked={index === 0}/>
                        <span>{ this.upperCaseFirst(radio) }</span>
                    </label>
                </div>
            )
        })
    }
    onRadioButtonChange(e){
        this.setState({
            eventType:e.target.value
        })
    }
    validateAmount(value){
        return !!(value >= 0 && value);
    }
    onAmountChange(e){
        const formControls = {...this.state.formControls};
        formControls.amount.value = +e.target.value;
        formControls.amount.touched = true;
        formControls.amount.valid = this.validateAmount(+e.target.value);
        this.setState({formControls,isFormValid:formControls.amount.valid});
        console.log(this.state.formControls.amount)
    }
    onCategoryChange(e){
        this.setState({
            categoryId:e.target.value
        })
    }
    onEventAdd(){
        const evt = {
            "type": this.state.eventType,
            "amount": this.state.formControls.amount.value,
            "category": this.state.categoryId,
            "date": new Date().toDateString(),
        };
        EventService.addEvent(evt)
            .then(evt=>{
                this.showMessage('success','Successfully Added');
            })
            .catch(err=>{
                this.showMessage('danger',err.message);
            })
    }
    render() {
        const cls = ['form-group'];
        (!this.state.formControls.amount.valid && this.state.formControls.amount.touched) && cls.push('has-error');

        return (
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bordered">
                        <div className="header-block">
                            <h3 className="title">Add Event</h3>
                        </div>
                    </div>
                    <div className="card-block">
                        <form>
                            {
                                this.state.message.text ?
                                    <div className={'alert ' + this.state.message.type}>{this.state.message.text}</div>
                                    : null
                            }
                            <div className="form-group">
                                <label className="control-label" htmlFor="category">Select a category</label>
                                <select onChange={this.onCategoryChange.bind(this)} className="form-control" id="category">
                                    {this.props.categories.map(((category, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={category.id}>
                                                {category.name}
                                            </option>
                                        )
                                    }))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Select Type</label>
                                { this.renderRadioButtons() }
                            </div>
                            <div className={cls.join(' ')}>
                                <label className="control-label" htmlFor="amount">Enter amount</label>
                                <input onChange={this.onAmountChange.bind(this)} type="number" defaultValue={0} id="amount" className="form-control"/>
                                {
                                    !this.state.formControls.amount.valid && this.state.formControls.amount.touched ?
                                        <span className="form-help-text">Лимит должен быть выше 0</span> :
                                        null
                                }
                            </div>
                            <button onClick={this.onEventAdd.bind(this)} disabled={!this.state.isFormValid} type="button" className="btn btn-primary">To Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default AddEvent;
