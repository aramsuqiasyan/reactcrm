import React from 'react'

import {EventService} from "../Shared/Event_service";

class Story extends React.Component {
    state = {
        events: []
    };

    componentDidMount() {
        EventService.getEvents()
            .then(events => {
                this.setState({events});
            });
    }

    render() {
        return (
            <article className="content">
                <div className="title-block">
                    <h3 className="title">
                        Story Page <span className="sparkline bar"/>
                    </h3>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-block">
                                    <section className="example" style={{textAlign: 'center'}}>
                                        <div id="morris-donut-chart">
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bordered">
                                    <div className="header-block">
                                        <h3 className="title">Event List</h3>
                                    </div>
                                    <div className="form-inline pull-right m-r-2">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Поиск..."/>
                                        </div>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-secondary dropdown-toggle ">
                                                Parameters
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="action">Action</a>
                                                <a className="dropdown-item" href="action">Another action</a>
                                                <a className="dropdown-item" href="action">Something else here</a>
                                                <div className="dropdown-divider"/>
                                                <a className="dropdown-item" href="action">Separated link</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-block">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Category</th>
                                            <th>Type Of</th>
                                            <th className="text-lg-center">Act</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.events.map((evt, index) => {
                                                const cls  = ['label'];
                                                evt.type === 'income' ? cls.push('label-success') : cls.push('label-danger');

                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{evt.amount}</td>
                                                        <td>{evt.date}</td>
                                                        <td>{evt.category}</td>
                                                        <td>
                                                            <span className={cls.join(' ')}>{evt.type}</span>
                                                        </td>
                                                        <td className="text-lg-center">
                                                            <a href="open" className="btn btn-primary-outline">Open</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        )
    }
}

export default Story;
