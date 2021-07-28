import axios from "axios";
import React, { Fragment, useState } from "react";

import styles from "./style.module.css"


const SignInForm = props => {
    const [userState, setUserState] = useState({ firstName: "", lastName: "", userName: "", password: "" });
    const [isValidUserName, setValidUserName] = useState(false);
    const [isSuccess, setSuccess] = useState(false)
    const passwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const handleValueChange = (event) => {
        if (event.target.name === "firstName") {
            setUserState({ ...userState, firstName: event.target.value });
        } else if (event.target.name === "lastName") {
            setUserState({ ...userState, lastName: event.target.value });
        } else if (event.target.name === "userName") {
            setUserState({ ...userState, userName: event.target.value });
            chcekUserName(event.target.value)
        } else if (event.target.name === "password") {
            setUserState({ ...userState, password: event.target.value });
        } else {
            return;
        }
    }
    const chcekUserName = async (data) => {
        let respose = await axios(
            {
                url: `https://www.reddit.com/api/username_available.json?user=${data}`,
                method: "GET"
            }
        );
        let tempResponse = respose.data === true ? true : false;

        setValidUserName(tempResponse);
    }
    const handleButtonClick = (e) => {
        e.preventDefault();
        setSuccess(true);

    }
    const checkButtonDisable = () => {
        if (
            userState?.firstName?.length &&
            userState?.lastName?.length &&
            userState?.userName?.length &&
            userState?.password?.length &&
            userState?.password?.match(passwRegex) && isValidUserName
        ) {
            return false;
        } else {
            return true;
        }
    }
    console.log(userState, "userstate");
    return (
        <Fragment>
            {
                isSuccess ?
                    <h1>SuccessFully registered</h1>
                    : (
                        <form onSubmit={handleButtonClick} className={styles.form}>
                            <h1>signin form</h1>
                            <div>
                                <label>first name</label>
                                <input onChange={(e) => handleValueChange(e)} value={userState.firstName} name="firstName" required type="text" />
                            </div>
                            <div>
                                <label>last name</label>
                                <input onChange={(e) => handleValueChange(e)} value={userState.lastName} name="lastName" required type="text" />
                            </div>
                            <div>
                                <label>user name</label>
                                <input onChange={(e) => handleValueChange(e)} value={userState.userName} name="userName" required type="text" />
                                {userState.userName ? (isValidUserName === true ? <p className={styles.success}>{userState.userName} - is your user name</p> : <p>This username is taken</p>) : ""}
                            </div>
                            <div>
                                <label>password</label>
                                <input minLength={8} maxLength={20} onChange={(e) => handleValueChange(e)} value={userState.password} name="password" required type="password" />
                                {<p>{userState.password && (userState.password.match(passwRegex) ? "" : "password should include capital and a Number")}</p>}
                            </div>
                            <button disabled={checkButtonDisable()} type="submit">submit</button>
                        </form>

                    )
            }
        </Fragment>


    )
}

export default SignInForm;