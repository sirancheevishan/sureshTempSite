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
    return <div></div>;
  }
}

export default Requestform;
