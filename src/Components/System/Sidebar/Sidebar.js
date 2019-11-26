import React from 'react';
import { NavLink} from "react-router-dom";

class Sidebar  extends React.Component{

    state = {
        activePath:window.location.pathname
    };

    getNavLinkClass(path){
        this.setState({
            activePath:path
        });
    };

    componentDidMount() {
        this.setState({
            activePath:'/system/bill'
        });
    }

    render() {
        return (
            <aside className="sidebar">
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <div className="brand">
                            <div className="logo">
                                <span className="l l1" />
                                <span className="l l2" />
                                <span className="l l3" />
                                <span className="l l4" />
                                <span className="l l5" />
                            </div>
                            Money
                        </div>
                    </div>
                    <nav className="menu">
                        <ul className="nav metismenu">
                            <li onClick={this.getNavLinkClass.bind(this,"/system/bill")} className={this.state.activePath === '/system/bill'  ? 'active' : null}>
                                <NavLink  to={'/system/bill'}> <i className="fa fa-building-o"/> Score </NavLink>
                            </li>
                            <li onClick={this.getNavLinkClass.bind(this,"/system/story")} className={this.state.activePath === '/system/story'  ? 'active' : null}>
                                <NavLink to={'/system/story'}> <i className="fa fa-flash"/> Story </NavLink>
                            </li>
                            <li onClick={this.getNavLinkClass.bind(this,"/system/planing")} className={this.state.activePath === '/system/planing'  ? 'active' : null}>
                                <NavLink to={'/system/planing'}> <i className="fa fa-archive"/> Planing </NavLink>
                            </li>
                            <li onClick={this.getNavLinkClass.bind(this,"/system/records")} className={this.state.activePath === '/system/records'  ? 'active' : null}>
                                <NavLink to={'/system/records'}> <i className="fa fa-plus-square"/> Record </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        )
    }
}


export default Sidebar;
