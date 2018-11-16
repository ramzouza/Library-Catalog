import React, { Component } from 'react';
import {GET, POST} from './ApiCall';
import cookie from 'react-cookies'

class Transaction extends Component {
    constructor(){
        super()

        this.state = {
            transaction: {
                "id": "",
                "user_id": "",
                "transaction_type":"",
                "timestamp":""
            }
        }
    }

    componentDidMount(){
        this.setState({"transaction":this.props.transaction})
    }

    

    render() {
        const { transaction } = this.props
        return (
            <tr>
                <td>{transaction.id}</td>
                <td>{transaction.userData.results.email}</td>
                <td>{transaction.user_id}</td>
                <td>{transaction.resource_id}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.timestamp}</td>
            </tr> 
        );

    }

}

export default Transaction;