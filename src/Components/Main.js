import React from "react";
import emailjs from "emailjs-com";
import swal from "sweetalert2";

const errbox = {
  border: "1px solid red",
};
const normalbox = {
  border: "1px solid #cec9c9",
};
const show = {
  display: "block !important",
};
const hide = {
  display: "none !important",
};

class Requestform extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      value: {
        Name: "",
        MailID: "",
        Subject: "",
        Message: "",
      },
      error: {
        Name: "",
        MailID: "",
        Subject: "",
        Message: "",
      },
      MailStatus: "",
      loadingstatus: false,
    };
  }

  assignedvalue = (event) => {
    debugger;

    if (event.currentTarget.dataset.type.toString() == "Name") {
      const val = event.currentTarget.value;
      if (val != "") {
        this.setState((prevState) => {
          let value = Object.assign({}, prevState.value);
          value.Name = val;
          return { value };
        });
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.Name = "";
          return { error };
        });
      } else {
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.Name = "Please Enter your name";
          return { error };
        });
      }
    }

    if (event.currentTarget.dataset.type.toString() == "Email") {
      const val = event.currentTarget.value;
      if (val != "") {
        this.setState((prevState) => {
          let value = Object.assign({}, prevState.value);
          value.MailID = val;
          return { value };
        });
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.MailID = "";
          return { error };
        });
      } else {
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.MailID = "Please Enter your Mail";
          return { error };
        });
      }
    }

    if (event.currentTarget.dataset.type.toString() == "subject") {
      const val = event.currentTarget.value;
      if (val != "") {
        this.setState((prevState) => {
          let value = Object.assign({}, prevState.value);
          value.Subject = val;
          return { value };
        });
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.Subject = "";
          return { error };
        });
      } else {
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.Subject = "Please Enter Subject";
          return { error };
        });
      }
    }

    if (event.currentTarget.dataset.type.toString() == "Message") {
      const val = event.currentTarget.value;
      if (val != "") {
        this.setState((prevState) => {
          let value = Object.assign({}, prevState.value);
          value.Message = val;
          return { value };
        });
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.Message = "";
          return { error };
        });
      } else {
        this.setState((prevState) => {
          let error = Object.assign({}, prevState.error);
          error.Message = "Please Enter Message";
          return { error };
        });
      }
    }
  };

  sendmail = (e) => {
    debugger;

    this.setState({
      loadingstatus: true,
    });

    e.preventDefault();
    var errflg = false;

    if (this.state.value.Name == "") {
      errflg = true;
      this.setState((prevState) => {
        let error = Object.assign({}, prevState.error);
        error.Name = "Please Enter Name";
        return { error };
      });
    }
    if (this.state.value.MailID == "") {
      errflg = true;
      this.setState((prevState) => {
        let error = Object.assign({}, prevState.error);
        error.MailID = "Please Enter Mail ID";
        return { error };
      });
    }
    if (this.state.value.Subject == "") {
      errflg = true;
      this.setState((prevState) => {
        let error = Object.assign({}, prevState.error);
        error.Subject = "Please Enter Subject";
        return { error };
      });
    }
    if (this.state.value.Message == "") {
      errflg = true;
      this.setState((prevState) => {
        let error = Object.assign({}, prevState.error);
        error.Message = "Please Enter Message";
        return { error };
      });
    }

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(this.state.value.MailID)) {
      errflg = true;
      this.setState((prevState) => {
        let error = Object.assign({}, prevState.error);
        error.MailID = "Please Enter valid email address.";
        return { error };
      });
    }

    if (errflg == true) return false;
    var rest = e.target;
    emailjs
      .sendForm(
        "gmail",
        "template_ybxblbn",
        e.target,
        "user_UphYegg5nyIVFIapd55Pw"
      )
      .then(
        (result) => {
          this.setState({
            loadingstatus: false,
          });
          console.log(result.text);
          if (result.text == "OK" && result.status == "200") {
            swal
              .fire({
                title: "Success!",
                text: "Your Mail Send Sucessfully.",
                type: "success",
                icon: "success",
              })
              .then(() => {
                rest.reset();
              });
          } else {
            swal
              .fire({
                title: "Failure!",
                text: "Unable to send mail. Please try again later.",
                type: "error",
                icon: "error",
              })
              .then(() => {
                rest.reset();
              });
          }
        },
        (error) => {
          this.setState({
            loadingstatus: false,
          });
          swal
            .fire({
              title: "Failure!",
              text: "Problem occured while send mail. Please try again later.",
              type: "error",
              icon: "error",
            })
            .then(() => {
              rest.reset();
            });
        }
      );

    // e.target.reset();
  };

  render() {
    const errmsg = {
      color: "red",
    };
    return (
      <form className="php-email-form" onSubmit={this.sendmail}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="name">Your Name</label>
            <input
              type="text"
              name="name"
              data-type="Name"
              className={"form-control"}
              style={this.state.error.Name == "" ? normalbox : errbox}
              id="name"
              data-rule="minlen:4"
              onChange={this.assignedvalue}
            />
            <span style={errmsg}>{this.state.error.Name}</span>
            <div className="validate"></div>
          </div>
          <div class="form-group col-md-6">
            <label for="name">Your Email</label>
            <input
              type="email"
              data-type="Email"
              className={"form-control"}
              style={this.state.error.MailID == "" ? normalbox : errbox}
              name="email"
              id="email"
              data-rule="email"
              data-msg="Please enter a valid email"
              onChange={this.assignedvalue}
            />
            <span style={errmsg}>{this.state.error.MailID}</span>
          </div>
        </div>
        <div className="form-group">
          <label for="name">Subject</label>
          <input
            type="text"
            data-type="subject"
            class="form-control"
            name="subject"
            id="subject"
            data-rule="minlen:4"
            data-msg="Please enter at least 8 chars of subject"
            className={"form-control"}
            style={this.state.error.Subject == "" ? normalbox : errbox}
            onChange={this.assignedvalue}
          />
          <span style={errmsg}>{this.state.error.Subject}</span>
        </div>
        <div className="form-group">
          <label for="name">Message</label>
          <textarea
            className="form-control"
            name="message"
            data-type="Message"
            rows="10"
            className={"form-control"}
            style={this.state.error.Message == "" ? normalbox : errbox}
            data-rule="required"
            data-msg="Please write something for us"
            onChange={this.assignedvalue}
          ></textarea>
          <span style={errmsg}>{this.state.error.Message}</span>
        </div>
        <div className="mb-3">
          <div
            className="loading"
            style={this.state.loadingstatus == true ? show : hide}
          >
            Loading
          </div>
          <div
            className="error-message"
            style={this.state.MailStatus.toString() === "F" ? show : hide}
          >
            Unable to send mail. Please try again later.
          </div>
          <div
            className="sent-message"
            style={this.state.MailStatus.toString() === "S" ? show : hide}
          >
            Your message has been sent. Thank you!
          </div>
        </div>
        <div className="text-center">
          <button type="submit">Send Message</button>
        </div>
      </form>
    );
  }
}

export default Requestform;
