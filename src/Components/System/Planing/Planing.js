import React from 'react'
import {BillService} from "../Shared/Bill_service";
import {CategoryService} from "../Shared/Category_service";
import {EventService} from "../Shared/Event_service";

class Planing extends React.Component {

    state = {
        bill: {
            value: 0,
            currency: "EUR"
        },
        categories: []
    };

    componentDidMount() {
        BillService.getBill()
            .then(bill => {
                CategoryService.getCategories()
                    .then(categories => {
                        const cats = [...categories];
                        categories.forEach((category, index) => {
                            EventService.getEventsByCategoryId(category.id)
                                .then(currentCatEvents => {
                                    if (currentCatEvents.length === 0) {
                                        cats[index].left = 0;
                                    } else {
                                        cats[index].left = this.getCategoryLeft(currentCatEvents);
                                    }
                                    this.setState({
                                        categories: cats,
                                        bill
                                    });
                                })
                        });
                    })
            });

    }


    getCategoryLeft(events) {
        return events.reduce((total, current) => {
            if (current.type === 'outcome') {
                total += +current.amount
            }
            return total;
        }, 0);
    }


    getPercent(number, left) {
        return Math.round(left / number * 100);
    }

    render() {
        return (
            <article className="content">
                <div className="title-block">
                    <h3 className="title">
                        Planing Page <span className="sparkline bar"/>
                    </h3>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-sm bordered">
                                    <div className="header-block">
                                        <h3 className="title">Costs</h3>
                                    </div>
                                    <h5 className="planning-expenses pull-right">
                                        Total balance: <span
                                        className="text-success">{this.state.bill.value} {this.state.bill.currency}</span>
                                    </h5>
                                </div>
                                <div className="card-block">
                                    {
                                        this.state.categories.map((category, index) => {
                                            const score = category.left ? +(category.number) - +(category.left) : +category.number;
                                            const percent = this.getPercent(category.number, category.left) + '%';
                                            const cls = [];
                                            parseInt(percent) <= 30 ? cls.push('success') :
                                                parseInt(percent) > 70 ? cls.push('danger') : cls.push('warning');

                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col-xs-6">
                                                        <div className="n-progress">
                                                            <div className={'progress-bar ' + cls.join(' ')}
                                                                 style={{width: percent}}>
                                                                <span>{category.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6">
                                                        <p>
                                                            <span
                                                                className={'text-' + cls.join(' ')}>{category.left}</span> 
                                                            out of
                                                            <span className="text-primary">{category.number}</span>
                                                             | 
                                                            <span className="text-success">{score}</span> (RUB) left
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        )
    }
}

export default Planing;
