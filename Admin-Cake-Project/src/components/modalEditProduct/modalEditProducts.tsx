import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "./modalEditProducts.css";
import { IProduct } from "../../types/interface";
import { MdAddPhotoAlternate } from "react-icons/md";
import { formatPrice } from "../../common/formatPrice";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/products.service";
import UploadService from "../../services/uploadImage.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { notifyError, notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
interface Props {
  offModalEdit: Function;
  dataEdit: any;
}
const ModalProducts = (props: Props): JSX.Element => {
  const [updateData, setUpdateData] = useState<IProduct>(props.dataEdit);
  const [images, setImages] = useState<any>();
  const [file, setFile] = useState<any>();
  const dispatch = useDispatch();
  const handleOpenEdit = (e: MouseEvent<HTMLElement>) => {
    const spanElements = e.target as HTMLElement;
    const inputElements = spanElements.parentElement?.querySelector(
      "input"
    ) as HTMLInputElement;
    spanElements.style.fontSize = "20px";
    spanElements.style.color = "#000";
    inputElements.style.border = "1px solid #000";
    inputElements.removeAttribute("disabled");
    // inputElements.setAttribute("autoFocus", "true")
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };
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

  const handleUpdateProducts = async (id: number) => {
    try {
      const productService = new ProductService();
      const uploadService = new UploadService();
      if (file) {
        const url = await uploadService.uploadImage(
          file,
          `Products/${props.dataEdit.category}`
        );
        let newProducts = {
          ...updateData,
          image: url,
        };

        await productService.editProduct(id, newProducts);
      } else {
        await productService.editProduct(id, updateData);
      }
      dispatch(update());
      props.offModalEdit();
      notifySuccess("Product updated successfully");
    } catch (error: any) {
      notifyError(error.response.data);
    }
  };

  return (
    <div className="modalEditProductsOverlay">
      <div className="modalEditProducts">
        <div className="modalEditProductsImg">
          <img
            src={images?.preview ? images?.preview : props.dataEdit.image}
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
        <div className="modalEditProductsInputs">
          <div className="modalEditProductsInput">
            <input
              value={updateData.name}
              onChange={handleChangeInput}
              disabled
              placeholder={props.dataEdit?.name}
              type="text"
              name="name"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.desc}
              onChange={handleChangeInput}
              disabled
              placeholder={props.dataEdit?.desc}
              type="text"
              name="desc"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.price}
              onChange={handleChangeInput}
              disabled
              placeholder={formatPrice(props.dataEdit?.price)}
              type="text"
              name="price"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.stock}
              onChange={handleChangeInput}
              disabled
              placeholder={`${props.dataEdit?.stock} products`}
              type="text"
              name="stock"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
        </div>
        <div className="modalEditProductsActions">
          <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={() => handleUpdateProducts(props.dataEdit.id)}
            okText="Yes"
            cancelText="No"
          >
            <button>UPDATE</button>
          </Popconfirm>
          <button onClick={() => props.offModalEdit()}>CANCEL</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalProducts;
