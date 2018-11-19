import React, { Component } from 'react';
import { GET, POST } from './ApiCall';
import cookie from 'react-cookies'

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
        this.setState({ "loaned": this.props.Loan })
    }

    handleReturnResource() {
        const id = cookie.load('id')
        POST('/returnItem', { itemId: this.props.line_item.id }, { id })
            .then(res => res.json())
            .then(res => {
                this.props.handler2();
                this.setState({
                    editing: true, user_id: "Available",
                    date_due: ""
                })
            })
    }

    render() {
        const { loan } = this.props
        return (
            <React.Fragment>
                <tr>
                    <td>{loan.title}</td>
                    <td>{loan.userData.results.email}</td>
                    <td>{loan.user_id}</td>
                    <td>{loan.resource_id}</td>
                    <td>{loan.date_due}</td>
                </tr>
            </React.Fragment>

        );

    }

}

export default Loan;