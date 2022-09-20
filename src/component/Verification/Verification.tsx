import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import CallLogo from "../../assets/icons/call.svg";
import Flag from "../../assets/icons/flag.svg";
import Lock from "../../assets/icons/lock.svg";
import Time from "../../assets/icons/time.svg";
import Mail from "../../assets/icons/mail.svg";
import { ReactComponent as Right } from "../../assets/icons/right-arrow.svg";
import Left from "../../assets/icons/left-arrow.svg";
import Home from "../../assets/icons/home.svg";
import Logo from "../../assets/icons/garage-logo.png";
import Room from "../../assets/icons/classroom.svg";
import Talent from "../../assets/icons/talent.svg";
import UserLogo from "../../assets/icons/user.svg";
import Preloader from "../SplashScreen2/Preloader";
import "./Verification.scss";
import Button from "../Button/Button";

interface FormProps {
  phone_number: number;
}

let currentOtpIndex: number = 0;
const Verification: React.FC = (props) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [active, setActive] = useState<number>(0);

  console.log(otp);

  //phone number validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormProps>();
  const watchPhoneNumber = watch("phone_number");

  console.log(watchPhoneNumber);

  // handle submit

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  const handleSendOtp = () => {
    // sent otp
    nextStep();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) {
      setActive(currentOtpIndex - 1);
    } else {
      setActive(currentOtpIndex + 1);
    }

    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") setActive(currentOtpIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [active]);

  console.log(otp);

  const [step, setStep] = useState(1);
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <>
      <div>
        {
          {
            1: (
              <div className="header">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p>Enter your phone number</p>
                  <img src={CallLogo} className="call-logo" alt="" />
                  <div className="number-container">
                    <img src={Flag} alt="" />
                    <input
                      type="number"
                      className="input-holder"
                      placeholder=" +91 1 2 3 4 5 6 7 8 9 "
                      {...register("phone_number", {
                        required: "Phone number is Required",
                      })}
                    />
                  </div>
                  {errors.phone_number && (
                    <p className="text-red">Phone number is Required !</p>
                  )}
                  {/* 
                  <button
                    disabled={
                      !watchPhoneNumber ||
                      watchPhoneNumber.toString().length < 10 ||
                      watchPhoneNumber.toString().length > 10
                    }
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button> */}
                  <Button
                    variant="primary"
                    disabled={
                      !watchPhoneNumber ||
                      watchPhoneNumber.toString().length < 10 ||
                      watchPhoneNumber.toString().length > 10
                    }
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                </form>
              </div>
            ),
            2: (
              <>
                <Preloader />
                <div className="otp-container">
                  <img src={Lock} alt="" className="lock-logo" />
                  <div className="otp-box">
                    {otp.map((_, index) => {
                      return (
                        <React.Fragment key={index}>
                          <input
                            ref={index === active ? inputRef : null}
                            type="password"
                            onChange={handleChange}
                            onKeyDown={(e) => handleOnKeyDown(e, index)}
                            value={otp[index]}
                          />
                          {index === otp.length - 1 ? null : <span></span>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <Button
                    variant="primary"
                    disabled={!otp.every((e) => e !== "")}
                    onClick={nextStep}
                  >
                    Enter OTP
                  </Button>
                  <div className="time-container">
                    <div className="container">
                      <img src={Time} alt="" />
                      <Countdown
                        date={Date.now() + 60000}
                        renderer={({ completed, minutes, seconds }) => {
                          if (completed) return "";
                          else
                            return (
                              <div style={{ color: "white" }}>
                                {minutes}:{seconds}
                              </div>
                            );
                        }}
                      />
                    </div>

                    <p>Resent OTP</p>
                  </div>
                </div>
              </>
            ),
            3: (
              <div className="name-container">
                <p>
                  Enter your <span>name</span>
                </p>
                <div className="input-container">
                  <img src={UserLogo} alt="" />
                  <input type="text" />
                </div>
                <div className="right-arrow">
                  <Right />
                </div>
              </div>
            ),

            4: (
              <div className="mail-container">
                <p>
                  Enter your <span>e-mail</span>
                </p>
                <div className="input-container">
                  <img src={Mail} alt="" />
                  <input type="text" />
                </div>
                <div className="arrows">
                  <img onClick={prevStep} src={Left} alt="" />
                  <Right />
                </div>
              </div>
            ),
            5: (
              <div className="mail-container">
                <p>
                  Enter your <span>address</span>
                </p>
                <div className="input-container">
                  <img src={Home} alt="" />
                  <input type="text" />
                </div>
                <div className="arrows">
                  <img onClick={prevStep} src={Left} alt="" />
                  <Right />
                </div>
              </div>
            ),
            6: (
              <div className="mail-container">
                <p>
                  Select your <span>country</span>
                </p>
                <div className="input-container">
                  <img src={Flag} alt="" />
                  <input type="text" />
                </div>
                <div className="arrows">
                  <img onClick={prevStep} src={Left} alt="" />
                  <Right />
                </div>
              </div>
            ),
            7: (
              <div className="welcome-container">
                <p>Welcome to</p>
                <img src={Logo} className="logo" alt="" />
                <img src={Talent} alt="" className="talent" />
                <img src={Room} className="room" alt="" />
                <button>Start learning</button>
                <div className="arrows">
                  <img onClick={prevStep} src={Left} alt="" className="left" />
                </div>
              </div>
            ),
          }[step]
        }
      </div>
    </>
  );
};

export default Verification;
