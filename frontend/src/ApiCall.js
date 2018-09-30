import {API} from './URLs'

export function apiCall(route,data){
    return fetch(API+route, {headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data)})
}