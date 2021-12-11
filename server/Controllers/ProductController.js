
const createProduct = async (req, res) => {
  res.json({ data: "CreateProduct" });
}

const getAllProduct = async (req, res) => {
  res.json({ data: "GetAllProduct" });
}

const deleteProduct = async (req, res) => {
  res.json({ data: "DeleteProduct" });
}

const updateProduct = async (req, res) => {
  res.json({ data: "UpdateProduct" });
}

const getSingleProduct = async (req, res) => {
  res.json({ data: "GetSingleProduct" });
}

module.exports = { createProduct, getAllProduct, deleteProduct, updateProduct, getSingleProduct };