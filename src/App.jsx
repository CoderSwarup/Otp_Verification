
import React, { useState, useRef } from 'react';
import './App.css';
import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  const [num, setNum] = useState('');
  const [navigate, setNavigate] = useState(false)

  // 
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [loading, setloading] = useState(false)
  const [user, setuser] = useState(false)

  // Phone Input 
  const handleInputChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    setNum(value)
  }
  // 
  // Opt Input 
  const handleInputChange2 = (index, event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Paste Functionality
  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData('Text');
    const pastedOtp = clipboardData.slice(0, 6).replace(/\D/g, '');
    const newOtp = [...otp];

    for (let i = 0; i < pastedOtp.length; i++) {
      newOtp[i] = pastedOtp[i];
      inputRefs.current[i].value = pastedOtp[i];
    }

    setOtp(newOtp);
  };

  // Key Functionality

  const handleKeyDown = (index, event) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (event.key === 'Backspace' && index >= 0) {
      if (event.key === 'Backspace' && index > 0 && event.target.value === '') {
        inputRefs.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  // Change Number Functionality
  const changeNum = () => {
    if (confirm('You Want To Change Number')) {
      window.location.reload(false);
      setNavigate(false);
    }

  }
  // Verifivation OF OTP

  const OnCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignInSubmit()
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth);
    }
  }

  const onSignInSubmit = () => {
    if (num.length === 10 && num !== '') {
      setNavigate(true)
      OnCaptchVerify()

      const appVerifier = window.recaptchaVerifier;

      const phoneNumber = '+91' + num
      console.log(phoneNumber)
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
          console.log('done')
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log('error')
        });

    } else {
      confirm('Please Correct input')
    }
  }

  const onOtpVerify = () => {

    let n = otp.join('');
    if (n.length === 6) {
      setloading(true)
      window.confirmationResult.confirm(n).then(async (res) => {
        // console.log(res)
        setuser(true)
      }).catch((err) => {
        confirm("Wrong OTP")
        console.log(err)
        setloading(false)
      })
    } else {
      confirm("Enter Complete OTP")
    }

  }

  return (
    <>
      {/* captcha  */}
      <div id='recaptcha-container'></div>
      {

        navigate ? (
          // Otp INPUT DIV
          <div>
            {
              user ?
                (
                  <h2 className='done'>Successfully Verify</h2>
                )
                : (
                  <div className='main'>
                    <h2>Phone Verification</h2>
                    <p onClick={() => navigate('/')}>Enter OTP You Recived on XXXX-XXXX-{num.slice(6, 10)}</p>
                    <div>
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={value}
                          required
                          className="inputfield"
                          onChange={(event) => handleInputChange2(index, event)}
                          onKeyDown={(event) => handleKeyDown(index, event)}
                          onPaste={(event) => handlePaste(event)}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                      ))}
                    </div>
                    <p className='paragraph' onClick={() => changeNum()}>Change Number</p>

                    <button className='mybutton' onClick={() => onOtpVerify()}>
                      {
                        loading && (<ClipLoader
                          color='#ffffff'
                          loading='true'
                          size={20}
                          aria-label="FadeLoader"
                          data-testid="FadeLoader"
                        />)
                      }
                      Verify Phone Number</button>



                  </div>
                )}
          </div>
        ) : (
          // Phone INPUT DIV
          <div className='main'>
            <div className="container1">

              <h2>Phone Verification</h2>

              <div className='container'>
                <p className='para'>Phone number</p>

                <input
                  required
                  placeholder='Phone Number'
                  value={num}
                  onChange={(event) => handleInputChange(event)}
                  className='phone' type="text" pattern="\d*" maxLength="10"></input>
                <button className='mybutton' onClick={() => onSignInSubmit()} id='sign-in-button' >GET OTP</button>
              </div>

            </div>

          </div>
        )
      }
    </>
  );
}

export default App;

