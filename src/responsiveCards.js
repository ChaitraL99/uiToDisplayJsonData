import React from "react";
import data from "./test_json.json";
import "./responsiveCards.css";
import * as ReactBootstrap from "react-bootstrap";
import { Modal, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class ResponsiveCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      userGivenDate: new Date(),
      activityData: [],
      instanceId: "",
      activityDataNull: "",
    };
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = (event, name) => {
    this.setState({ show: true, instanceId: name });
  };

  handleSubmit(event) {
    event.preventDefault();

    data.members.map((member) => {
      if (member.real_name === this.state.instanceId) {
        member.activity_periods.map((act) => {
          if (
            act.start_time.includes(
              moment(this.state.userGivenDate).format("MMM D YYYY")
            )
          ) {
            let tempActivityData = [...this.state.activityData];
            tempActivityData.push(act);
            this.setState({ activityData: tempActivityData });
          } else {
            this.setState({
              activityDataNull: "No activities found on this day",
            });
          }
        });
      }
    });
  }
  handleDateChange = (date) => {
    this.setState({
      userGivenDate: date,
    });
  };
  render() {
    return (
      <div>
        <div className="mainBody">
          <h1 class="fixed-top headerName">Users</h1>
          <div className="container">
            {data.members.map(function (member, i) {
              return (
                <div key={i} className="box">
                  <div className="content">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Activity period of {this.state.instanceId}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                          <DatePicker
                            selected={this.state.userGivenDate}
                            onChange={this.handleDateChange}
                          />

                          <input type="submit" value="Check" />
                        </form>
                        <div>
                          <p>The activity of {this.state.instanceId} </p>
                          <p>{this.state.activityDataNull}</p>
                          {this.state.activityData.map((act) => {
                            return (
                              <ReactBootstrap.Card>
                                <Card.Body>
                                  <div>
                                    Activities on :
                                    {moment(
                                      act.start_time,
                                      "MMM DD YYYY hh:mm A"
                                    ).format("MMM DD YYYY")}
                                  </div>
                                  <div>
                                    Start time:
                                    {moment(
                                      act.start_time,
                                      "MMM DD YYYY hh:mm A"
                                    ).format("hh:mm A")}
                                  </div>
                                  <div>
                                    End time:
                                    {moment(
                                      act.end_time,
                                      "MMM DD YYYY hh:mm A"
                                    ).format("hh:mm A")}
                                  </div>
                                </Card.Body>
                              </ReactBootstrap.Card>
                            );
                          })}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <p>
                      <h2>
                        <Button
                          className="nameButton"
                          onClick={(event) =>
                            this.handleShow(event, member.real_name)
                          }
                        >
                          {member.real_name}
                        </Button>
                      </h2>
                    </p>
                  </div>
                </div>
              );
            }, this)}
          </div>
        </div>
      </div>
    );
  }
}

export default ResponsiveCard;
