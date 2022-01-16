import "../../styles/components/home/Price.scss"

const Price = ({amount}) => {
    return (
        <div className="price-tag">
            <span>$</span>
            {Math.floor(amount)}
            {amount < 100 && <span>{(amount % 1).toFixed(2).substring(2)}</span>}
        </div>
    )
}

export default Price