import "../styles/components/Signin.scss"
import Input from "./Input";
import {FaApple, FaEnvelope, FaEye, FaFacebookF, FaGoogle, FaTimes} from "react-icons/fa";

const Signin = ({close, change}) => {
    // FORM VALIDATION STILL NEEDS TO BE DONE. (IE. PASSWORD IS INNCORRECT OR NAME IS TOO LONG)
    // IF YOU NEED HELP WITH THIS CONTACT ETHAN
    const formSubmit = (e) => {
        e.preventDefault();
        const {target} = e;

        // setError("some error triggered when form validation is failed")
        // To chnage styles

        // Do whatever you need with the form data
    }

    // The valid provider names are "google", "facebook", or "apple"
    // Feel free to disassemble and reassemble however you'd like
    const provider = (name) => {
        // Do whatever you need to do with the providers
    }

    return (
        <div className="signin-popup">
            <div className="darken"></div>
            <div className="content">
                <div className="title">
                    <h2>Sign In</h2>
                    <div className="switch" onClick={change}>
                        Register
                    </div>
                    <div className="cancel-icon" onClick={close}>
                        <FaTimes />
                    </div>
                </div>
                <form onSubmit={formSubmit}>
                    <div className="traditional">
                        <Input name="email" placeholder="example@gmail.com" icon={<FaEnvelope />} />
                        <Input name="password" type="password" icon={<FaEye />} />
                    </div>

                    <div className="forgot-password">
                        Forgot Your Password?
                    </div>

                    <button type="submit">
                        Submit
                    </button>

                    <div className="sep">
                        <div className="dash"></div>
                        <span>or</span>
                        <div className="dash"></div>
                    </div>

                    <div className="with">
                        <div className="google" onClick={() => provider("google")}>
                            <FaGoogle />
                            <span>Contuine with Google</span>
                        </div>
                        <div className="facebook" onClick={() => provider("facebook")}>
                            <FaFacebookF />
                            <span>Contuine with Facebook</span>
                        </div>
                        <div className="apple" onClick={() => provider("apple")}>
                            <FaApple />
                            <span>Contuine with Apple</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
