import React, { Component } from "react";
import '../base.css';
import './teacher.css';

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:[],
          math:[],
          physics:[],
          chemist:[],
          progress:[],
          parents:[],
          teacher:[],
        }
      }
      componentDidMount = () => {
        let token = localStorage.getItem("token");
        if(!token){
            localStorage.setItem("token","patEJuKmcrcNSUMxY.edb1fa453d2e06be7f002e6205f1296e110108008866a7af0ff6f4430a0b08ed");
            token = localStorage.getItem("token");
        }
        console.log(token);
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
                                <tr>
                                    <td>Nguyen Hoang Nam</td>
                                    <td>10</td>
                                    <td>7</td>
                                    <td>6</td>
                                    <td>
                                        <button className="btn btn-primary"><i className="fa-solid fa-square-pen"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nguyen Hoang Anh</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>
                                        <button className="btn btn-primary"><i className="fa-solid fa-square-pen"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
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
                        <div>
                            <span>Nguyen Van A</span>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '60%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">60%</div>
                            </div>
                            <div className="my-1 d-flex justify-content-between">
                                <button className="btn btn-primary"><i className="fa-solid fa-arrow-left"></i></button>
                                <button className="btn btn-primary"><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                        <div>
                            <span>Nguyen Van A</span>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '60%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">60%</div>
                            </div>
                            <div className="my-1 d-flex justify-content-between">
                                <button className="btn btn-primary"><i className="fa-solid fa-arrow-left"></i></button>
                                <button className="btn btn-primary"><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <h4>Resvision class</h4>
                        <p>Student list</p>
                        <ol>
                            <li>Nguyen Hoang Nam</li>
                            <li>Nguyen Hoang A</li>
                        </ol>
                        <p>Schedule:</p>
                        <ol>
                            <li>2022-08-10 08:00:00</li>
                            <li>2022-08-11 08:00:00</li>
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