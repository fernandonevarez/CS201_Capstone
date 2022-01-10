import "../styles/components/Input.scss"

const Input = ({name, title, type, icon, placeholder, error, ...other}) => {
    return (
        <div className={`input ${name}`}>
            <div className="label"></div>
            <p>{title || name[0].toUpperCase() + name.substring(1, name.length)}</p>
            <label htmlFor={name}>
                <input
                    type={type || "text"}
                    name={name} id={name}
                    placeholder={placeholder || ""}
                    autoCorrect="false"
                    {...other}
                />
                {icon && <div className="icon">
                    {icon}
                </div>}
            </label>
        </div>
    )
}

export default Input
