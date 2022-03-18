
import "../../styles/components/form/InputArea.scss"

const InputArea = ({name, title, type, placeholder, error, ...other}) => {
    return (
        <div className={`input-area ${name}`}>
            <div className="label">
                <p>{title || name[0].toUpperCase() + name.substring(1, name.length)}</p>
                <label htmlFor={name}>
                    <textarea
                        type={type || "text"}
                        name={name} id={name}
                        placeholder={placeholder || ""}
                        autoCorrect="false"
                        {...other}
                    ></textarea>
                </label>
            </div>
        </div>
    )
}

export default InputArea
