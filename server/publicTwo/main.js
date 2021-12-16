const url = `/api/v1/products`

const fileForm = document.querySelector('.file-form');
const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price');
const imageInput = document.querySelector('#image');
const container = document.querySelector('.container');

let imageValue;  // saves image's path on upload

imageInput.addEventListener("change", async (e) => {
  // grabs the file from the input - type file
  const imageFile = e.target.files[0];
  const formData = new FormData();

  formData.append('image', imageFile);

  // console.log(...formData.keys());
  try {
    const { data: { image: { src } } } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    imageValue = src
  } catch (error) {
    imageValue = null
    console.log(error);
  }
})


fileForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const nameValue = nameInput.value;
  const priceValue = priceInput.value;
  try {
    const product = { name: nameValue, price: priceValue, image: imageValue }
    await axios.post(url, product);

    fetchProducts()
  } catch (error) {
    console.log(error);
  }
})

async function fetchProducts() {
  try {
    const { data: { products } } = await axios.get(url);
    const tempConatinerHTML = products.map((product) => {
      return `<article class="product">
        <img src="${product.image}" alt="${product.name}" class="img"/>
        <footer>
          <p>
            ${product.name}
          </p>
          <span>
          ${product.price}
          </span>
        </footer>
      </article>`
    }).join("")

    container.innerHTML = tempConatinerHTML
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();