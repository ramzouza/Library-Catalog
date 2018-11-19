import {API} from './URLs'
import cookie from 'react-cookies'


export function apiCall(route,data, more_headers){
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json', 'id': id, ...more_headers }, method: 'POST', body: JSON.stringify(data)})
}

export function POST(route, data, more_headers){
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json', 'id': id,...more_headers }, method: 'POST', body: JSON.stringify(data)})
}

export function GET(route, more_headers){
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json','id': id, ...more_headers }, method: 'GET'})
}

export function PUT(route, data, more_headers){
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json','id': id, ...more_headers }, method: 'PUT', body: JSON.stringify(data)})
}

export function DELETE(route, data, more_headers){
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json','id': id, ...more_headers }, method: 'DELETE', body: JSON.stringify(data)})
}


