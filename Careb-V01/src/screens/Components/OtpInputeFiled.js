import React, { Component } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OTPInput from 'react-otp-input';
import BaseUrl from '../Server/BaseUrl';
import './OtpInputeFiled.css'

export default class OtpInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      value: '',
      verificationCodeSent: false,
      message: '',
      user_id: localStorage.user_id,
    };
  }

  handleVerifyClick = async () => {
    try {
      const response = await fetch(BaseUrl.BaseUrl + '/auth/send_otp', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          mobile_no: this.state.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data show ', data);
        this.setState({ verificationCodeSent: true, message: data.message });
        // this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' });
      } else {
        const data = await response.json();
        this.setState({ message: data.error });
        console.error('Error sending OTP:', data.error);
        // this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' });
      }
    } catch (error) {
      console.error('Error:', error);
      // this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' });
    }
  };

  handleVerifyOTP = async () => {
    const { otp, value } = this.state;
console.log('')
    try {
      const response = await fetch(BaseUrl.BaseUrl + '/auth/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_no: value,
          otp: otp,

        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data show ', data);

        // Handle the verification status as needed
        if (data.message.status === 'approved') {
          // this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' });
        } else {
          console.error('OTP verification failed:', data.message);
          alert('Invalid OTP')
        }
      } else {
        const data = await response.json();
        console.error('Error verifying OTP:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { value, verificationCodeSent } = this.state;

    return (
      <div className='v-phone-number' style={{ width: '70%', padding: 30 }}>
        <label style={{ marginLeft: 20 }}>Step 3/8</label>
        <h4 style={{ fontSize: 25, fontWeight: '700', marginLeft: 20 }}>Verify Phone Number</h4>
        <label style={{ fontSize: 13, fontWeight: '400', color: '#0F172A', marginLeft: 20 }}>
          
        </label>
        <div style={{ height: '40%', borderColor: '#E2E8F0', padding: 20 }}>
          <label style={{ color: '#474554' }}>Mobile No</label>
          <br />
          <div className='mo-no' style={{ display: 'flex', width: '60%' }}>
            <PhoneInput 
              inputStyle={{
                width: '90%',
                height: 40,
                borderColor: '#E2E8F0',
              }}
              buttonStyle={{
                width: 39,
                borderColor: '#E2E8F0',
                height: 40,
              }}
              placeholder="Enter phone number"
              value={value}
              onChange={(newValue) => this.setState({ value: newValue })}
              country={'eg'}
              enableSearch={true}
            />
            {verificationCodeSent ? (
              <button
                style={{ width: '23%' }}
                className="me-2 btn btn-outline-dark"
                type="button"
                onClick={()=>
                  this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' })
                }
              >
                Verify OTP
              </button>
            ) : (
              <button
                style={{ width: '23%', background: 'transparent', fontWeight: 700}}
                className="me-2 btn btn-outline-dark"
                type="button"
                onClick={()=>
                  this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' })
                }              >
                Verify
              </button>
            )}
          </div>
          <div className='otp-no'>
          <p>
            Enter 5 Digit Code and Verify your Phone Number
          </p>
          <OTPInput 
            value={this.state.otp}
            onChange={(value) => this.setState({ otp: value })}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: 45,
              height: 45,
              fontSize: '18px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          />
        </div>
        </div>
        <div className="main-btn" style={{ display: 'flex', marginTop: '1%', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button className='back-btn'
            style={{ width: '10%', borderRadius: 10, height: '45px', borderWidth: 0, background: 'white',color:'black' }}
            onClick={() =>
              this.props.NextCallBack({ navigationTo: 'Upload_Profile', id: 2, currentid: 3, bt_type: 'Back' })
            }
          >
            Back
          </button>
          <button className='next-btn'
            style={{
              color: 'white',
              background: '#F15A29',
              width: '15%',
              borderRadius: 10,
              height: '45px',
              marginLeft: 10,
              border: 'none'

            }}
            onClick={()=>
              this.props.NextCallBack({ navigationTo: 'Pasport_veri', id: 4, bt_type: 'Next' })
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}


