require('dotenv').config();

const PORT = process.env.PORT || 3000;
const data = require('./shopping-list.json');

const express = require('express');
const app = express ();

app.get('/', (request, response) => {
    console.log('Get /');
    response.send('movies for you');   
});

app.get('/bananas', (request, response) => {
    response.json({message: 'banana message'});
});

app.get('/shopping-list', (request, response) => {
    const type = request.query.type;
    if(typeof type !== 'string') throw new Error('List type error');

    const shoppingList = new List(type);
    response.json(shoppingList.getItems());
});

class List {
    constructor(type='food') {
        this.list = data.lists.find(list => list.listName === type);
    }
    getItems() {
        return this.list.items.map(item => item.name);
    }
}




app.get('/async-error', (request, response, next) => {
    
    try {
        throw new Error('some async error happened');
    } catch (error) {
    next(error);
    }

    response.send('async error');
});


app.get('*', (request, response) => {
    response.status(404).send('not found');
  });

app.use((error, request, response, next) => {
    console.error(error);
    response.status(500).send(error.message);
  });


app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

