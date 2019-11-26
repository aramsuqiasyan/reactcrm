import React from 'react';
import {Link} from "react-router-dom";

class Header  extends React.Component{
    state = {
        username:'',
        droppedDown:false,
        date: this.getDate()
    };


    getDate(){
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const current_datetime = new Date();
        return months[current_datetime.getMonth()] + ' ' + current_datetime.getDate() + " " + current_datetime.getFullYear();
    }
    getBill(){

    }
    handleClickOutside = (e) => {
        if(!e.target.classList.contains('name') && !e.target.classList.contains('dropdown-toggle')){
            this.setState({
                droppedDown:false
            })
        }
    };
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        const user = JSON.parse(window.localStorage.getItem('user'));
        if(user){
            this.setState({
                username: user.name
            })
        }

    }
    componentWillUnmount() {
        document.removeEventListener('click',  this.handleClickOutside);
    }
    dropDownHandler(){
        this.setState({
            droppedDown:!this.state.droppedDown
        })
    }
    render() {
        return (
            <header className="header">
                <div className="header-block header-block-search">
                    {this.state.date}
                </div>
                <div className="header-block header-block-nav">
                    <ul className="nav-profile">
                        <li className={ + this.state.droppedDown ? 'profile dropdown open' : 'profile dropdown'}>
                            <a className="nav-link dropdown-toggle" href="dowpdown" role="button" onClick={this.dropDownHandler.bind(this)}>
                                <span className="name">
                                    Hi, { this.state.username }
                                </span>
                            </a>
                            <div className="dropdown-menu profile-dropdown-menu">
                                <Link className="dropdown-item" to={'/system/bill'}> <i className="fa fa-gear icon"/>
                                    Сделать запись
                                </Link>
                                <div className="dropdown-divider"/>
                                <a href='exit' className="dropdown-item" onClick={this.props.onLogout}><i className="fa fa-power-off icon"/>Выйти</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}


export default Header;
