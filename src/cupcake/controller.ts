import {Request, Response} from 'express';
import {getAll, remove, get, upsert} from './model.js';
import {Cupcake } from './cupcake.js';

/**
 * [] or array of cupcake
 */
export async function listAction(request: Request, response: Response) {
    const cupcakes = await getAll();
    if (cupcakes == undefined) {
        response.json([]);
    } else {
        response.json(cupcakes);
    }
}

/**
 * 400: bad request
 * 404: not found
 */
export async function listOneAction(request: Request, response: Response) {
    if (request.params.cupcakeId == undefined) {
        console.log("Invalid ID supplied: not found")
        response.status(400).send('');
        return;
    }

    if (!isNumericString(request.params.cupcakeId)) {
        console.log("Invalid ID supplied: invalid cupcakeId type")
        response.status(400).send('');
        return;
    }

    const id = Number.parseInt(request.params.cupcakeId, 10);
    const cupcake = await get(id);
    console.log(cupcake);
    if (cupcake == undefined) {
        response.status(404).send('');
    } else {
        response.json([cupcake]);
    }
}

/**
 * 400: bad request
 * 404: not found
 */
export async function removeAction(request: Request, response: Response) {
    if (request.params.cupcakeId == undefined) {
        console.log("Invalid ID supplied: not found")
        response.status(400).send('');
        return;
    }
    
     if (!isNumericString(request.params.cupcakeId)) {
        console.log("Invalid ID supplied: invalid cupcakeId type")
        response.status(400).send('');
        return;
    }

    const id = Number.parseInt(request.params.cupcakeId, 10);
    console.log(id, request.params.cupcakeId, )
    
    // data found?
    const cupcake = await get(id);
    if (cupcake == undefined) {
        console.log("Cupcake not found")
        response.status(404).send('');
        return;
    } 

    await remove(id);
    response.status(200).send('');
}


export async function updateAction(request: Request, response: Response) {
    // validate request.params.cupcakeId
    if (!isNumericString(request.params.cupcakeId)) {
        console.log("Invalid ID supplied: invalid cupcakeId type")
        response.status(400).send('');
        return;
    }
    
    // data exist?
    const id = Number.parseInt(request.params.cupcakeId, 10);   
    const cupcake = await get(id);
    if (cupcake == undefined) {
        console.log("Cupcake not found")
        response.status(404).send('');
        return;
    }

    // request.body
    const updatedData = request.body;
    console.log(updatedData);
    // if body data contains a id, then check it is the same as the cupcakeId 
    if (updatedData.id != undefined && updatedData.id != cupcake.id ){
        console.log("Validation exception", updatedData.id, cupcake.id  )
        response.status(405).send('');
        return;
    }

    await upsert(updatedData);
    response.status(200).send('');
}

/**
 *   405: Invalid input
 * 
 * updatedData.id must point to an existing cupcake record
 */
export async function upsertAction(request: Request, response: Response) {
    const newData = request.body;
    console.log(newData);
 
    if (newData.id != undefined){
        if (!validateCupcakeJson(newData, true)){
            console.log("Invalid input: please validate your Cupcake json object");
            response.status(405).send('');
            return;
        }
        let cupcake = await get(newData.id);
        if (cupcake == undefined) {
           console.log("Cupcake not found: please provide a valid id, provided: ", newData.id);
           response.status(405).send('');
           return;
        }
    } else {
        if (!validateCupcakeJson(newData, false)){
            console.log("Invalid input: please validate your Cupcake json object");
            response.status(405).send('');
            return;
        }
    }

    // if id provided, then insert(), otherwise update()
    await upsert(newData);
    response.status(201).send('');

}

function isNumericString(inputStr: string): boolean {
    const data = parseFloat(inputStr);
    return !isNaN(data) && data.toString().length === inputStr.length;
}

function validateCupcakeJson(cupcake: Cupcake, checkId: Boolean) {
    console.log("validateCupcakeJson: checkId: ", checkId, ", id=", cupcake.id);
    if (checkId && typeof cupcake.id != "number"){
        console.log("'id' field must be a number, but found ",typeof cupcake.id);
        return false;
    }

    if (typeof cupcake.name != "string"){
        console.log("'name' field must be a string, but found ",typeof cupcake.name);
        return false;
    }

    if (typeof cupcake.description != "string"){
        console.log("'description' field must be a string, but found ",typeof cupcake.description);
        return false;
    }

    if (typeof cupcake.price != "number"){
        console.log("'price' field must be a number, but found ",typeof cupcake.price);
        return false;
    }

    if (typeof cupcake.ingredients != "object"){
        console.log("'ingredients' field must be an array of string, but found ",typeof cupcake.ingredients);
        return false;
    }

    return true;
}
