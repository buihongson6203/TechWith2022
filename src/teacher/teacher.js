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
            },
            formSchedule: {
                error: '',
                name: '',
                date: '',
                time: '',
            },
        }
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
    }


    //ADD STUDENT
    handleAddStudent = () => {
        this.setState(prevState => ({
            formStudent: {
                ...prevState.formStudent,
                error: '',
            }
        }), () => {
            const name = this.state.formStudent.name;
            const math = parseInt(this.state.formStudent.math);
            const physic = parseInt(this.state.formStudent.physicmark);
            const chemistry = parseInt(this.state.formStudent.chemistrymark);
            const progress = parseInt(this.state.formStudent.progress);

            // Kiểm tra và cập nhật thông báo lỗi mới
            let newError = '';

            if (isNaN(math) || isNaN(physic) || isNaN(chemistry) || isNaN(progress)) {
                newError = 'Please enter all fields';
            } else if (name.length < 3 || name.length > 50) {
                newError = 'Name must be between 3 and 50 characters';
            } else if (math < 0 || math > 10) {
                newError = 'Math must be between 0 and 10';
            } else if (physic < 0 || physic > 10) {
                newError = 'Physic must be between 0 and 10';
            } else if (chemistry < 0 || chemistry > 10) {
                newError = 'Chemistry must be between 0 and 10';
            } else if (progress < 0 || progress > 100) {
                newError = 'Progress must be between 0 and 100';
            }

            this.setState(prevState => ({
                formStudent: {
                    ...prevState.formStudent,
                    error: newError,
                },
            }));

            // Gọi API và xóa form
            if (newError === '') {
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
        });
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
        this.setState(prevState => ({
            formStudent: {
                ...prevState.formStudent,
                error: '',
                name: '',
                math: '',
                physicmark: '',
                chemistrymark: '',
                progress: ''
            },
            formSchedule: {
                ...prevState.formSchedule,
                error: '',
                name: '',
                date: '',
                time: '',
            }
        }));
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formStudent: {
                ...prevState.formStudent,
                [name]: value
            },
            formSchedule: {
                ...prevState.formSchedule,
                [name]: value
            }
        }));
    };

    handleAddSchedule = () => {
        this.setState(prevState => ({
            formSchedule: {
                ...prevState.formSchedule,
                error: '',
            }
        }), () => {
            const name = this.state.formSchedule.name;
            const date = this.state.formSchedule.date;
            const time = this.state.formSchedule.time;


            this.setState(prevState => ({
                formSchedule: {
                    ...prevState.formSchedule,
                },
            }));
            fetch('https://api.airtable.com/v0/appD5oPrzkMPYUqRq/Review%20Class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer patEJuKmcrcNSUMxY.edb1fa453d2e06be7f002e6205f1296e110108008866a7af0ff6f4430a0b08ed'
                },
                body: JSON.stringify({
                    fields: {
                        Name: name,
                        Schedule: `${date} ${time}`,
                    }
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.setState(prevState => ({
                        revclass: [...prevState.revclass, data]
                    }));
                    this.clearForm();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
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
                                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#studentEditModal">
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
                                    <button className="btn btn-primary"><i className="fa-solid fa-chevron-left"></i></button>
                                    <button className="btn btn-primary"><i className="fa-solid fa-chevron-right"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-6 mt-4">
                        <h4>Resvision class</h4>
                        <p>Student list:</p>
                        <ol>
                            {this.state.revclass.map((revclass, index) => (
                                <div key={index}>
                                    <li >{revclass.fields.Name}</li>
                                </div>

                            ))}
                        </ol>

                        <p>Schedule:</p>
                        <ol>
                            {this.state.revclass.map((revclass, index) => (
                                <li key={index}>{revclass.fields.Schedule}</li>
                            ))}
                        </ol>
                        <p>Add next Schedule</p>
                        <input className="mt-2 form-control" placeholder="Student name" name="name" value={this.state.formSchedule.name} onChange={this.handleInputChange} />
                        <input className="mt-2 form-control" type="date" name="date" value={this.state.formSchedule.date} onChange={this.handleInputChange} />
                        <input className="mt-2 form-control" type="time" name="time" value={this.state.formSchedule.time} onChange={this.handleInputChange} />
                        <button className="ms-auto my-1 btn btn-warning" onClick={this.handleAddSchedule}>Add schedule</button>
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
                        <img src="../students.jpg" alt="image" />
                    </div>
                </div>
                <div class="modal fade" id="studentEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Student editing</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label className="mb-1">Name</label>
                                <input className="form-control" type="text" name="name" placeholder="Student name" />
                                <label className="mb-1 mt-2">Math</label>
                                <input className="form-control" type="number" min={0} max={10} name="math" placeholder="Student math mark" />
                                <label className="mb-1 mt-2">Physic</label>
                                <input className="form-control" type="number" min={0} max={10} name="physic" placeholder="Student physic mark" />
                                <label className="mb-1 mt-2">Chemist</label>
                                <input className="form-control" type="number" min={0} max={10} name="chemist" placeholder="Student chemist mark" />
                                <label className="mb-1 mt-2">Progress</label>
                                <input className="form-control" type="number" min={0} max={100} name="progress" placeholder="Student progress" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Teacher;