const EventService = {
    getEvents() {
        return fetch('http://localhost:3200/events')
            .then(response => response.json())
    },

    addEvent(evt) {
        return fetch('http://localhost:3200/events', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(evt)
        })
            .then(response => response.json())
    },
    getEventsByCategoryId(id){
        return fetch(`http://localhost:3200/events?category=${id}`)
            .then(response => response.json())
    }
};


export {EventService} ;
