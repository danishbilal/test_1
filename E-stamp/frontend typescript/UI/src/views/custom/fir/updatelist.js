import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Axios from 'axios';
import msg from 'messages.js';

class UpdateFirList extends React.Component {
  state = {
    apiurl: "fir/",
    firdata: [],
  };
  componentDidMount() {
    this.getlist();
  }
  getlist = () => {
    Axios.get(`${process.env.REACT_APP_Api}${this.state.apiurl}/`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ firdata: response.data.firs });
          console.log("firlist", response);

        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 500) {
          //place your reentry code
          console.log(msg.servererror);

        }
        else {
          console.log(msg.servererror);

        }

      });

  }
  getBadge = (status) => {
    return status.toLowerCase() === 'approved' ? 'success' :
      status.toLowerCase() === 'inactive' ? 'secondary' :
        status.toLowerCase() === 'pending' ? 'warning' :
          // status.toLowerCase() === 'Banned' ? 'danger' :
          'primary'
  }
  approvefir = (id) => {
    console.log("id", id);
    var r = window.confirm("Do you want to approve this Fir ?\n");
    if (r === true) {
      this.updatestatus(id, "approved");
    }
  }
  updatestatus = (id, Status) => {
    const obj = [{
      propName: "Status",
      value: Status
    }];
    Axios.patch(`${process.env.REACT_APP_Api}${this.state.apiurl}${id}`, {
      data: obj
    })
      .then(response => {
        if (response.status === 200) {
          alert(msg.updatestatussuccess);
          this.getlist();

        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 500) {
          //place your reentry code
          alert(msg.updatestatusfailed);
        }
        else {
          alert(msg.servererror);

        }

      });

  }

  render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>E-stamp<small className="text-muted">List</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th> */}
                      <th scope="col">Tehsil Name</th>
                      <th scope="col">District Name</th>
                      <th scope="col">Deed Name</th>
                      <th scope="col">Stamp Paper Type</th>
                      <th scope="col">Agent Name</th>
                      <th scope="col">Agnet CNIC</th>
                      <th scope="col">Agent Contact</th>
                      <th scope="col">First Party Name</th>
                      <th scope="col">First Party CNIC</th>
                      <th scope="col">Second Party Name</th>
                      <th scope="col">Second Party CNIC</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.firdata.map((fir, index) =>

                      // const firdetails = `/listalldata/${fir._id}`;


                      <tr key={fir._id.toString()}>

                        <td><Link to={`/listalldata/${fir._id}`}>{fir.TehsilName}</Link></td>
                        <td>{fir.DistrictName}</td>
                        <td>{fir.DeedName}</td>
                        <td>{fir.StampPaperType}</td>
                        <td>{fir.AgentName}</td>
                        <td>{fir.AgentCNIC}</td>
                        <td>{fir.AgentContact}</td>
                        <td>{fir.FPName}</td>
                        <td>{fir.FPCNIC}</td>
                        <td>{fir.SPName}</td>
                        <td>{fir.SPCNIC}</td>
                        <td><Badge color={this.getBadge(fir.Status)}>{fir.Status}</Badge> <Link to={`/updatedata/${fir._id}`}><Button color="primary" className="px-2">Update</Button></Link>   </td>
                      </tr>
                      // this.firRow(fir)
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UpdateFirList;
