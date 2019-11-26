import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Header from './Header/Header';
import Sidebar from "./Sidebar/Sidebar";
import Bill from "./Bill/Bill";
import Story from "./Story/Story";
import Planing from "./Planing/Planing";
import Records from "./Records/Records";


class System extends React.Component {
    render() {
        return (
            <div className="main-wrapper">
                <div className="app">
                    <Header onLogout={this.props.onLogout}/>
                    <Sidebar/>
                    <Switch>
                        <Route path={"/system/bill"} component={Bill}/>
                        <Route path={"/system/story"} component={Story}/>
                        <Route path={"/system/planing"} component={Planing}/>
                        <Route path={"/system/records"} component={Records}/>
                        <Redirect to={"/system/bill"} />
                    </Switch>
                </div>
            </div>

        )
    }
}

export default System;
