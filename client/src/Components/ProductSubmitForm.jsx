import React, { useState, useEffect } from 'react'

const ProductSubmitForm = () => {
  return (
    <div>
      <form class="form file-form">
      <h4>File Upload</h4>
      <div class="form-row">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-input" id="name" value="chair" />
      </div>
      <div class="form-row">
        <label for="price" class="form-label">Price</label>
        <input type="text" class="form-input" id="price" value="123.45" />
      </div>
      <div class="form-row">
        <label for="imageOneInput" class="form-label">Image</label>
        <input type="file" class="form-input" id="imageOneInput" accept="image/*" />
      </div>
      <div class="form-row">
        <label for="imageTwoInput" class="form-label">Image</label>
        <input type="file" class="form-input" id="imageTwoInput" accept="image/*" />
      </div>
      <div class="form-row">
        <label for="imageThreeInput" class="form-label">Image</label>
        <input type="file" class="form-input" id="imageThreeInput" accept="image/*" />
      </div>
      <div class="form-row">
        <label for="imageFourInput" class="form-label">Image</label>
        <input type="file" class="form-input" id="imageFourInput" accept="image/*" />
      </div>
      <button class="btn btn-block" type="submit">Add Product</button>
    </form>

    <section class="container"></section>
    </div>
  )
}

export default ProductSubmitForm
