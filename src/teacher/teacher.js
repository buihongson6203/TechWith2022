import React, { Component } from "react";
import '../base.css';
import './teacher.css';
import axios from 'axios';
class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            revclass: [],
        }
    }
    componentDidMount = () => {
        let token = localStorage.getItem("token");
        if (!token) {
            localStorage.setItem("token", "patEJuKmcrcNSUMxY.edb1fa453d2e06be7f002e6205f1296e110108008866a7af0ff6f4430a0b08ed");
            token = localStorage.getItem("token");
        }
        console.log(token);
        //call api axios
        axios.get('https://api.airtable.com/v0/appD5oPrzkMPYUqRq/Students?maxRecords=3&view=student', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('Data fetched successfully:', response.data.records);
                let students = response.data.records;
                console.log(students)
                this.setState({ students: students });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            })
        axios.get('https://api.airtable.com/v0/appD5oPrzkMPYUqRq/Review%20Class?maxRecords=3&view=Grid%20view', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('Data fetched successfully:', response.data.records);
                let revclass = response.data.records;
                console.log(revclass)
                this.setState({ revclass: revclass });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            })
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log('previous state');
        console.log(prevState);
        console.log('next state');
        console.log(this.state);
    }

    render() {
        return (
            <div className="container py-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <span>Name: </span>
                        <h4 className="mb-0 ps-2">Teacher name</h4>
                    </div>
                    <button className="btn btn-danger">Logout</button>
                </div>
                <div className="py-3 row">
                    <div className="col-6">
                        <h4>Marks</h4>
                        <table className="table table-striped table-hover">
                            <thead className="">
                                <tr>
                                    <th>Name</th>
                                    <th>Math</th>
                                    <th>Physic</th>
                                    <th>Chemist</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.students.map((students, index) => (
                                    <tr key={index}>
                                        <td>{students.fields.Name}</td>
                                        <td>{students.fields.math}</td>
                                        <td>{students.fields.physic}</td>
                                        <td>{students.fields.chemistry}</td>
                                        <td>
                                            <button className="btn btn-primary">
                                                <i className="fa-solid fa-square-pen"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-2">
                                <input className="form-control" type="text" placeholder="Name" />
                            </div>
                            <div className="col-2">
                                <input className="form-control" type="number" placeholder="Mark" />
                            </div>
                            <div className="col-2">
                                <input className="form-control" type="number" placeholder="Mark" />
                            </div>
                            <div className="col-2">
                                <input className="form-control" type="number" placeholder="Mark" />
                            </div>
                            <div className="col-2">
                                <input className="form-control" type="number" placeholder="Progress" />
                            </div>
                            <div className="col-2">
                                <button className="btn btn-warning text-white"><i className="fa-solid fa-user-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h4 className="">Academic Progress</h4>
                        {this.state.students.map((student, index) => (
                            <div key={index}>
                                <h4>{student.fields.Name}</h4>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${student.fields.progress}%` }}
                                        aria-valuenow={student.fields.progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >{student.fields.progress}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-6 mt-4">
                        <h4>Resvision class</h4>
                        <p>Student list</p>
                        <ol>
                            {this.state.revclass.map((revclass, index) => (
                                    <li>{revclass.fields.Name}</li>
                            ))}
                        </ol>
                        <p>Schedule:</p>
                        <ol>
                            {this.state.revclass.map((revclass, index) => (
                                    <li>{revclass.fields.Schedule}</li>
                            ))}
                        </ol>
                        <p>Add next Schedule</p>
                        <input className="form-control" type="date" />
                        <input className="mt-2 form-control" type="time" />
                        <button className="ms-auto my-1 btn btn-warning">Add schedule</button>
                    </div>
                    <div className="col-6 mt-4">
                        <h4>Your Resource</h4>
                        <table className="table table-striped table-hover">
                            <thead className="">
                                <tr>
                                    <th>Subject</th>
                                    <th>Resource</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Math</td>
                                    <td><a href="#">link</a></td>
                                </tr>
                                <tr>
                                    <td>Physic</td>
                                    <td><a href="#">link</a></td>
                                </tr>
                                <tr>
                                    <td>Chemist</td>
                                    <td><a href="#">link</a></td>
                                </tr>
                                <tr>
                                    <td>Practice</td>
                                    <td><a href="#">link</a></td>
                                </tr>
                                <tr>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Subject" />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Title" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <input className="form-control" type="text" placeholder="Link to resource" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-warning">Add document</button>
                    </div>
                    <div className="col-12 mt-4">
                        <h4>Feedback</h4>
                        <table className="table table-striped table-hover">
                            <thead className="">
                                <tr>
                                    <th>From</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nguyen Hoang Nam</td>
                                    <td>243yfd</td>
                                    <td>tdbhduuj</td>
                                </tr>
                                <tr>
                                    <td>Nguyen Hoang Nam</td>
                                    <td>243yfd</td>
                                    <td>tdbhduuj</td>
                                </tr>
                                <tr>
                                    <td>Nguyen Hoang Nam</td>
                                    <td>243yfd</td>
                                    <td>tdbhduuj</td>
                                </tr>
                                <tr>
                                    <td>Nguyen Hoang Nam</td>
                                    <td>243yfd</td>
                                    <td>tdbhduuj</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6 mt-4">
                        <h4>Send announcement to students in your class:</h4>
                        <div>
                            <input className="form-control" type="text" placeholder="Title" />
                            <textarea className="mt-2 form-control" placeholder="message" cols={4}></textarea>
                            <button className="mt-2 btn btn-warning">Send</button>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <img src="./students.jpg" alt="image" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Teacher;