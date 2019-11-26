const CategoryService = {
    getCategories() {
        return fetch('http://localhost:3200/categories')
            .then(response => response.json())
    },
    addCategory(category) {
        return fetch('http://localhost:3200/categories', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        })
            .then(response => response.json())
    },
    getCategoryByTitle(title) {
        return fetch(`http://localhost:3200/categories?name=${title}`)
            .then(response => response.json())
            .then(category=>category[0])
    },
    updateCategory(category,id){
        return fetch(`http://localhost:3200/categories/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        })
            .then(response => response.json())
    }
};


export {CategoryService} ;
