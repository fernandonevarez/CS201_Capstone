import "../../styles/components/form/Button.scss"

const Button = ({className, text, type}) => {
    return (
        <button type={type || "button"} className={`button ${className}`}>{text}</button>
    )
}

export default Button