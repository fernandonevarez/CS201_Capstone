import SmallDeco from "../decoration/SmallDeco"
import "../../styles/components/products/Title.scss";

const Title = ({name}) => {
    return (
        <div className="section-title">
            <SmallDeco />
            <h2>{name}</h2>
            <SmallDeco />
        </div>
    )
}

export default Title
