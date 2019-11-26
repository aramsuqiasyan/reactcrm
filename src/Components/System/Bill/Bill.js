import React from 'react';
import {BillService} from '../Shared/Bill_service';

class Bill extends React.Component {
    state = {
        isLoaded: false,
        bill: {
            value: 0,
            currency: "EUR"
        },
        convertedCurrency: {
            USD: 0,
            RUB: 0,
        },
        currency: {
            USD:0,
            RUB:0
        },
        currencyDate:''
    };

    componentDidMount() {
        BillService.getBill()
            .then((bill) => {
                this.setState({bill});
                BillService.getCurrency('EUR')
                    .then(currency => {
                        let {USD, RUB} = currency['rates'];
                        this.setState({
                            convertedCurrency: {
                                USD: USD * bill.value,
                                RUB: RUB * bill.value
                            },
                            currency:{
                                USD,RUB
                            },
                            currencyDate:currency.date,
                            isLoaded: true
                        });
                    });
            });


    }

    refreshBill() {
        this.setState({
            isLoaded: false
        });
        BillService.getBill()
            .then((bill) => {
                this.setState({bill, isLoaded: true});
            });
    }

    render() {
        return (
            <article className="content dashboard-page">
                <div className="title-block">
                    <h3 className="title pull-left">
                        Score Page <span className="sparkline bar"/>
                    </h3>
                    <div className="pull-right">
                        <button className="btn-sm btn btn-primary-outline" onClick={this.refreshBill.bind(this)}>
                            <i className="fa fa-refresh"/>
                        </button>
                    </div>
                </div>
                {
                    this.state.isLoaded ?
                        <section className="section">
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-5 stats-col">
                                    <div className="card stats" style={{height: '291px'}}>
                                        <div className="card-block">
                                            <div className="title-block">
                                                <h4 className="title">Score</h4>
                                            </div>
                                            <div className="row row-sm stats-container">
                                                <div className="col-xs-12 stat-col">
                                                    <div className="stat-icon"><i className="fa fa-euro"/></div>
                                                    <div className="stat">
                                                        <div className="value">{this.state.bill.value}</div>
                                                    </div>
                                                    <progress className="progress stat-progress" value="100" max="100">
                                                        <div className="progress">
                                                            <span className="progress-bar" style={{width: '100%'}}/>
                                                        </div>
                                                    </progress>
                                                </div>
                                                <div className="col-xs-12 stat-col">
                                                    <div className="stat-icon"><i className="fa fa-rub"/></div>
                                                    <div className="stat">
                                                        <div className="value">{this.state.convertedCurrency.RUB}</div>
                                                    </div>
                                                    <progress className="progress stat-progress" value="100" max="100">
                                                        <div className="progress">
                                                            <span className="progress-bar" style={{width: '100%'}}/>
                                                        </div>
                                                    </progress>
                                                </div>
                                                <div className="col-xs-12 stat-col">
                                                    <div className="stat-icon"><i className="fa fa-dollar"/></div>
                                                    <div className="stat">
                                                        <div className="value">{this.state.convertedCurrency.USD}</div>
                                                    </div>
                                                    <progress className="progress stat-progress" value="100" max="100">
                                                        <div className="progress">
                                                            <span className="progress-bar" style={{width: '100%'}}/>
                                                        </div>
                                                    </progress>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-7 history-col">
                                    <div className="card">
                                        <div className="card-block">
                                            <div className="title-block">
                                                <h4 className="title">Course</h4>
                                            </div>
                                            <div className="row row-sm stats-container">
                                                <table className="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th>Currency</th>
                                                        <th>Score</th>
                                                        <th>Date</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>EUR</td>
                                                            <td>1</td>
                                                            <td>{this.state.currencyDate}</td>
                                                        </tr>
                                                        {
                                                           Object.keys(this.state.currency).map((currency,idx)=>{
                                                               return (
                                                                   <tr key={idx}>
                                                                       <td>{currency}</td>
                                                                       <td>{this.state.currency[currency]}</td>
                                                                       <td>{this.state.currencyDate}</td>
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
                            </div>
                        </section> :
                        <div className={'text-center'}>Loading...</div>

                }
            </article>
        )
    }
}


export default Bill;
