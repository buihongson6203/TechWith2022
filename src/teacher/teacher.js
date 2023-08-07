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
            feedback: [],
            formStudent: {
                error: '',
                name: '',
                math: '',
                physicmark: '',
                chemistrymark: '',
                progress: ''
            }
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount = () => {
        let token = localStorage.getItem("token");
        if (!token) {
            localStorage.setItem("token", "patEJuKmcrcNSUMxY.edb1fa453d2e06be7f002e6205f1296e110108008866a7af0ff6f4430a0b08ed");
            token = localStorage.getItem("token");
        }

        //CALL AXIOS TO TABLES
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
        axios.get('https://api.airtable.com/v0/appD5oPrzkMPYUqRq/Feedback?maxRecords=3&view=Grid%20view', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('Data fetched successfully:', response.data.records);
                let feedback = response.data.records;
                console.log(feedback)
                this.setState({ feedback: feedback });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            })
    }
    componentDidUpdate = (prevProps, prevState) => {
        // console.log('previous state');
        // console.log(prevState);
        // console.log('next state');
        // console.log(this.state.formStudent);
        // console.log(this.state);
    }


    //ADD STUDENT
    handleAddStudent = () => {
        // const name = document.getElementById("nameInput").value;
        // const math = parseInt(document.getElementById("mathInput").value);
        // const physic = parseInt(document.getElementById("physicInput").value);
        // const chemistry = parseInt(document.getElementById("chemistryInput").value);
        // const progress = parseInt(document.getElementById("progressInput").value);

        this.setState((prevState) => ({
            formStudent: {
                ...prevState.formStudent,
                error: '',
            }
        }));

        const name = this.state.formStudent.name;
        const math = parseInt(this.state.formStudent.math);
        const physic = parseInt(this.state.formStudent.physicmark);
        const chemistry = parseInt(this.state.formStudent.chemistrymark);
        const progress = parseInt(this.state.formStudent.progress);
        if (isNaN(math) || isNaN(physic) || isNaN(chemistry) || isNaN(progress)) {
            this.setState((prevState) => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: 'Please enter all fields',
                }
            }));
            return;
        }
        if (name.length < 3 || name.length > 50) {
            this.setState((prevState) => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: 'Name must be between 3 and 50 characters'
                }
            }));
        } else if (math < 0 || math > 10) {
            this.setState((prevState) => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: 'Math must be between 0 and 10'
                }
            }));
        } else if (physic < 0 || physic > 10) {
            this.setState((prevState) => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: 'Physic must be between 0 and 10'
                }
            }));
        } else if (chemistry < 0 || chemistry > 10) {
            this.setState((prevState) => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: 'Chemistry must be between 0 and 10'
                }
            }));
        } else if (progress < 0 || progress > 100) {
            this.setState((prevState) => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: 'Progress must be between 0 and 10'
                }
            }));
        }
        if (this.state.formStudent.error.length === 0) {
            fetch('https://api.airtable.com/v0/appD5oPrzkMPYUqRq/Students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer patEJuKmcrcNSUMxY.edb1fa453d2e06be7f002e6205f1296e110108008866a7af0ff6f4430a0b08ed'
                },
                body: JSON.stringify({
                    fields: {
                        Name: name,
                        math: math,
                        physic: physic,
                        chemistry: chemistry,
                        progress: progress,
                        teacher: 'Ngô Vĩnh Toàn'
                    }
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.setState(prevState => ({
                        students: [...prevState.students, data]
                    }));
                    this.clearForm();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    //DELETE STUDENTS
    handleDeleteStudent = (studentId) => {
        fetch(`https://api.airtable.com/v0/appD5oPrzkMPYUqRq/Students/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer patEJuKmcrcNSUMxY.edb1fa453d2e06be7f002e6205f1296e110108008866a7af0ff6f4430a0b08ed'
            }
        })
            .then(response => {
                if (response.ok) {
                    this.setState(prevState => ({
                        students: prevState.students.filter(student => student.id !== studentId)
                    }));
                } else {
                    console.error('Error:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    //CLEAR FORM AFTER ADD STUDENT
    clearForm = () => {
        // document.getElementById("nameInput").value = "";
        // document.getElementById("mathInput").value = "";
        // document.getElementById("physicInput").value = "";
        // document.getElementById("chemistryInput").value = "";
        // document.getElementById("progressInput").value = "";
        this.setState(prevState => ({
            formStudent: {
                ...prevState.formStudent,
                error: '',
                name: '',
                math: '',
                physicmark: '',
                chemistrymark: '',
                progress: ''
            }
        }));
    };

    // handleInputChange = (e) => {
    //     this.setState({
    //         inputname: e.target.value,
    //       });
    // };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formStudent: {
                ...prevState.formStudent,
                [name]: value
            }
        }));
    };


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
                                                <i className="fa-solid fa-trash-can" onClick={() => this.handleDeleteStudent(students.id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-2">
                                <input id="nameInput" className="form-control" type="text" name="name" placeholder="Name" value={this.state.formStudent.name} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-2">
                                <input id="mathInput" className="form-control" type="number" name="math" placeholder="Mark" value={this.state.formStudent.math} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-2">
                                <input id="physicInput" className="form-control" type="number" name="physicmark" placeholder="Mark" value={this.state.formStudent.physicmark} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-2">
                                <input id="chemistryInput" className="form-control" type="number" name="chemistrymark" placeholder="Mark" value={this.state.formStudent.chemistrymark} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-2">
                                <input id="progressInput" className="form-control" type="number" name="progress" placeholder="Progress" value={this.state.formStudent.progress} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-2">
                                <button className="btn btn-warning text-white" onClick={this.handleAddStudent}>
                                    <i className="fa-solid fa-user-plus"></i>
                                </button>
                            </div>
                        </div>
                        <p className="mt-2 text-danger">{this.state.formStudent.error}</p>
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
                                <div className="mt-2 d-flex align-items-center justify-content-between">
                                    <button className="btn btn-primary"><i class="fa-solid fa-chevron-left"></i></button>
                                    <button className="btn btn-primary"><i class="fa-solid fa-chevron-right"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-6 mt-4">
                        <h4>Resvision class</h4>
                        <p>Student list:</p>
                        <ol>
                            {this.state.revclass.map((revclass, index) => (
                                <li key={index}>{revclass.fields.Name}</li>
                            ))}
                        </ol>

                        <p>Schedule:</p>
                        <ol>
                            {this.state.revclass.map((revclass, index) => (
                                <li key={index}>{revclass.fields.Schedule}</li>
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
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.feedback.map((feedback, index) => (
                                    <tr key={index}>
                                        <td>{feedback.fields.Students}</td>
                                        <td>{feedback.fields.Title}</td>
                                        <td>{feedback.fields.Message}</td>
                                    </tr>
                                ))}
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