import { Cupcake } from './cupcake.js';

// sample data
let data:Cupcake[] =[
    {id: 0, name: "Banana Blast", description:"Our most popular", price:5, ingredients:["banana", "walnut"]},
    {id: 1, name: "Vanilla Cupcake", description:"Our best vanilla cupcake", price:10, ingredients:["cream", "vanilla"]},
    {id: 2, name: "Chocolate Cupcake", description:"Made from real dark chocolate", price:20, ingredients:["chocolate"]}
    ]

export function getAll() {
    return Promise.resolve(data);
}

export function remove(id: number) {
    data = data.filter(obj => obj.id !== id);
    return Promise.resolve();
}

export function get(id: number) {
    return Promise.resolve(data.find((obj) => obj.id === id));
}

function getNextId() {
    return Math.max(...data.map((c) => c.id), -1) + 1;
}

function insert(cupcake: Cupcake) {
    cupcake.id = getNextId();
    console.log("insert()",cupcake.id );
    data.push(cupcake);
}

function update(cupcake: Cupcake) {
    const index = data.findIndex((obj) => obj.id === cupcake.id);
    console.log("update():",index, cupcake.id );
    data[index] = cupcake;
}

/**
 * If you want to trigger an update(), then validate cupcake.id before calling this
 */
export function upsert(cupcake: Cupcake) {
    if (cupcake.id == undefined) {
        insert(cupcake);
    } else {
        update(cupcake);
    }
    return Promise.resolve();
}