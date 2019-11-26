const BillService = {
    getBill() {
       return fetch('http://localhost:3200/bill')
               .then(response => response.json());
    },
    getCurrency(base){
        return fetch(`http://data.fixer.io/api/latest?access_key=a148e57d38db1fa010336901787daed0&base=${base}`)
            .then((response=>response.json()));
    }

};

export {BillService};
