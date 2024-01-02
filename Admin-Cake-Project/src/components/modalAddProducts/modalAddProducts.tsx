import { Popconfirm } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./modalAddProducts.css";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess, notifyWarning } from "../../common/toastify";
import { IProduct } from "../../types/interface";
import ProductService from "../../services/products.service";
import UploadService from "../../services/uploadImage.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
interface Props {
  offModalAdd: Function;
}
const ModalAddProducts = (props: Props) => {
  const [images, setImages] = useState<any>();
  const [file, setFile] = useState<any>();
  const [newProduct, setNewProduct] = useState<IProduct>({
    name: "",
    price: 9999,
    stock: 9999,
    isDelete: true,
    image:
      "https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Nodata%2Fupload-image-icon.webp?alt=media&token=60b8bf2e-4b47-4079-b9e6-6974347e337c",
    desc: "",
    category: "",
  });

  const handleAvatar = (e: any) => {
    try {
      let file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setFile(file);
      setImages(file);
    } catch (error: any) {
      notifyError(error.response.data);
    }
  };
  useEffect(() => {
    return images && URL.revokeObjectURL(images.preview);
  }, [images]);

  //   Validate Blur
  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    const spanElements = e.target.parentElement?.querySelector(
      ".ruleBlur"
    ) as HTMLSpanElement;
    if (e.target.value === "" || e.target.value === "0") {
      e.target.style.border = "1px solid red";
      spanElements.innerText = "Enter this field*";
    } else {
      e.target.style.border = "1px solid #000";
      spanElements.innerText = "";
    }
  };

  //   Get value new product
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 0) {
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setNewProduct({
        ...newProduct,
        category: e.target.value,
      });
    }
  };

  //  Validate rule and request API
  const dispatch = useDispatch()
  const handleAddNewProduct = async () => {
      if (
        newProduct.name === "" ||
        newProduct.desc === "" ||
        newProduct.category === "" ||
        newProduct.price === 9999 ||
        newProduct.stock === 9999
      ) {
        notifyWarning("Please enter all field");
      } else {
        try {
          const productService = new ProductService();
          const uploadService = new UploadService();
          if (file) {
            const url = await uploadService.uploadImage(file, `Products/${newProduct.category}`)
            let result = {
                ...newProduct,
                image: url
            }
            await productService.addProduct(result)
          }else{
            notifyError('Your image is not valid')
          }
          dispatch(update())
          props.offModalAdd()
          notifySuccess("Added product successfully")
        } catch (error:any) {
            console.log(error.response.data);
            
        }
      }
    }
  return (
    <div className="modalAddProductsOverlay">
      <div className="modalAddProducts">
        <div className="modalAddProductsImg">
          <img
            src={images?.preview ? images.preview : newProduct.image}
            alt=""
          />
          <div className="selectFile">
            <label htmlFor="photo">
              <MdAddPhotoAlternate />
            </label>
            <input
              onChange={handleAvatar}
              style={{ display: "none" }}
              type="file"
              name=""
              id="photo"
            />
          </div>
        </div>
        <div className="modalAddProductsInputs">
          <div className="modalAddProductsInput">
            <input
              onChange={handleChangeInput}
              value={newProduct.name}
              onBlur={handleBlurInput}
              placeholder="Name Product"
              type="text"
              name="name"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <input
              onChange={handleChangeInput}
              value={newProduct.desc}
              onBlur={handleBlurInput}
              placeholder="Describe"
              type="text"
              name="desc"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <p>Price</p>
            <input
              onChange={handleChangeInput}
              value={newProduct.price}
              onBlur={handleBlurInput}
              placeholder="Price"
              type="text"
              name="price"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <p>Stock</p>
            <input
              onChange={handleChangeInput}
              value={newProduct.stock}
              onBlur={handleBlurInput}
              placeholder="Stock"
              type="text"
              name="stock"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <select onChange={handleChangeSelect} name="" id="">
              <option value="">--Category--</option>
              <option value="Cake & Deserts">Cake & Deserts</option>
              <option value="Bread">Bread</option>
              <option value="Burger & Pizza">Burger & Pizza</option>
              <option value="Cookie & Biscuit">Cookie & Biscuit</option>
              <option value="Donuts">Donuts</option>
            </select>
          </div>
        </div>
        <div className="modalAddProductsActions">
          <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={handleAddNewProduct}
            okText="Yes"
            cancelText="No"
          >
            <button>ADD+</button>
          </Popconfirm>
          <button onClick={() => props.offModalAdd()}>CANCEL</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalAddProducts;
