import {API} from './URLs'

export function apiCall(route,data, more_headers){
    return fetch(API+route, {headers: { 'Content-Type': 'application/json', ...more_headers }, method: 'POST', body: JSON.stringify(data)})
}