import React, { Component } from 'react';
import { GET, POST } from './ApiCall';
import cookie from 'react-cookies'
import swal from 'sweetalert2'

class Loan extends Component {
    constructor() {
        super()

        this.state = {
            loan: {
                "Title": "",
                "id": "",
                "user_id": "",
                "timestamp": "",
                "title": ""
            }
        }
    }

    componentDidMount() {
        const isAdmin = cookie.load('admin') === 'yes'
        this.setState({ "loaned": this.props.Loan, isAdmin })
    }
    
    handleReturnResource() {
        const id = cookie.load('id')
        POST('/returnItem', { itemId: this.props.loan.id }, { id })
            .then(res => res.json())
            .then(res => {
                    swal({
                        title: 'Ok!',
                        text: `${this.props.loan.type} returned!`,
                        type: 'success',
                        confirmButtonColor: '#037d9e',
                        confirmButtonText: 'Ok!',
                        allowOutsideClick:false
                    
                    })
                    this.props.refresh()
            })
    }

    render() {
        const { loan, isAdmin} = this.props
        return (
            <React.Fragment>
                <tr>
                    <td>{loan.id}</td>
                    <td>{loan.title}</td>
                    <td>{loan.userData.results.email}</td>
                    <td>{loan.user_id}</td>
                    <td>{loan.resource_id}</td>
                    <td>{loan.date_due}</td>
                    {isAdmin ? <td><button class="btn-cart btn btn-warning" type="button" onClick={() => this.handleReturnResource()}><i class="fas fa-inbox"></i></ button></td> : null }
                </tr>
            </React.Fragment>

        );

    }

}

export default Loan;