import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

var style = {
  base: {
    color: "#303238",
    fontSize: "16px",
    fontFamily: '"Open Sans", sans-serif',
    fontSmoothing: "antialiased",
    "::placeholder": {
      color: "#CFD7DF"
    }
  },
  invalid: {
    color: "#e5424d",
    ":focus": {
      color: "#303238"
    }
  }
};
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.setCurrentUser = this.props.setCurrentUser;
    this.handleSave = this.props.handleSave;
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }
  handleSave = this.props.handleSave
  setCurrentUser = this.props.setCurrentUser
  
  async submit(ev) {
    ev.preventDefault();
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log('token', token);
    let data = {
      token: token.id,
      total_amount: this.props.amount
    };
    let response = await fetch("https://fresh-farm.herokuapp.com/user/charge", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({ data })
    });

    if (response.ok) {
      this.setState({ complete: true });
      const data = await response.json();
      this.props.setOrder(data.order_items);
      this.props.getOrder();
      this.handleSave();
      console.log("Purchase Complete!");
    } else {
      console.log("order error");
      alert("Error");
    }
  }

  render() {
    if (this.state.complete) return <h5>Purchase Complete!</h5>;

    return (
      <div className="checkout">

        <div className="mb-5">
          <div className="input-with-lable-wrapper">
            <div className="input-with-lable-lable">Phone</div>
            <div className="input-with-lable-content">
              <input
                type="text"
                className="input-with-lable-content"
                defaultValue={this.currentUser && this.currentUser.phone}
                onChange={e =>
                  this.setCurrentUser({ ...this.currentUser, phone: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="input-with-lable-wrapper">
            <div className="input-with-lable-lable">Email</div>
            <div className="input-with-lable-content">
              <input
                type="text"
                className="input-with-lable-content"
                defaultValue={this.currentUser && this.currentUser.email}
                onChange={e =>
                  this.setCurrentUser({ ...this.currentUser, email: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="input-with-lable-wrapper">
            <div className="input-with-lable-lable">Address</div>
            <div className="input-with-lable-content">
              <input
                type="text"
                className="input-with-lable-content"
                defaultValue={this.currentUser && this.currentUser.address}
                onChange={e =>
                  this.setCurrentUser({ ...this.currentUser, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <CardElement style={style} />
        </div>
        <button
          className="ff-primary-btn confirm-order-btn-sm mt-5"
          onClick={this.submit}
        >
          Purchase
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
