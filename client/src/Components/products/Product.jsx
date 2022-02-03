import Template from "./Template";
import "../../styles/components/products/Product.scss"

const Product = (props) => {
    return <Template {...props} classAddition="normal" />
}

export default Product;