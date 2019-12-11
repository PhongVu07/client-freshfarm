import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let data = {
      'token': token.id,
      'total_amount': this.props.amount
    }
    let response = await fetch("https://fresh-farm.herokuapp.com/user/charge", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({data})
    });
    
    if (response.ok) {
      this.setState({complete: true});
      const data = await response.json();
      this.props.setOrder(data.order_items);
      this.props.getOrder()
      console.log("Purchase Complete!")
    } else {
      console.log("order error");
      alert("Error");
    }
  };

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <CardElement />
        <button className="ff-primary-btn confirm-order-btn-sm"  onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);