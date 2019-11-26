import React from 'react'
import AddCategory from "./AddCategory";
import AddEvent from "./AddEvent";
import EditCategory from "./EditCategory";
import {CategoryService} from "../Shared/Category_service";


class Records extends React.Component {
    state = {
        selectedCategory:'',
        isLoaded: false,
        categories: []
    };
    componentDidMount() {
        this.setState({isLoaded: false});
        CategoryService.getCategories()
            .then((categories => {
                this.setState({categories, isLoaded: true,selectedCategory:categories[1].name});
            }))
    }
    onCategoryAdd(category) {
        this.setState({isLoaded: false});
        CategoryService.addCategory(category)
            .then(data => {
                const categories = [...this.state.categories];
                categories.push(data);
                this.setState({
                    categories,
                    isLoaded: true
                });
            })
    }
    onCategoryUpdate(category,id) {
        CategoryService.updateCategory(category,id)
            .then(category=>{
               const id = category.id;
               const categories = this.state.categories;
               const catIndex = categories.findIndex(c=>c.id === id);
                categories[catIndex] = category;
                this.setState({
                    categories
                })
            })
    }
    render() {
        return (
            <article className="content">
                <div className="title-block">
                    <h3 className="title">
                        Records Page<span className="sparkline bar"/>
                    </h3>
                </div>

                <section className="section">
                    <div className="row">
                        <AddCategory onCategoryAdd={this.onCategoryAdd.bind(this)}/>
                        <EditCategory onCategoryUpdate={this.onCategoryUpdate.bind(this)} categories={this.state.categories}/>
                    </div>
                    <AddEvent categories={this.state.categories}/>
                </section>
            </article>
        )
    }
}
export default Records;
