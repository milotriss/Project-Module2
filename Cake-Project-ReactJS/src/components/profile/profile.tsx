import {
  ChangeEvent,
  useEffect,
  useState,
  MouseEvent,
  HTMLInputTypeAttribute,
} from "react";
import "./profile.css";
import UserService from "../../services/users.service";
import { IUser } from "../../types/interface";
import { TbPhotoEdit } from "react-icons/tb";
import { notifyError, notifySuccess } from "../../common/toastify";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import UploadService from "../../services/uploadImage.service";
import { Popconfirm } from "antd";

interface Props {
  offProfile: Function;
}
const Profile = (props: Props): JSX.Element => {
  const idUser = localStorage.getItem("idUser");
  const userService = new UserService();
  const uploadService = new UploadService();
  const [avatars, setAvatars] = useState<any>();
  const [file, setFile] = useState<any>();

  const [user, setUser] = useState<IUser>({
    email: "",
    fullName: "",
    password: "",
    avatar: "",
    role: 1,
    status: true,
    phone: "",
    address: "",
    cart: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const data: any = await userService.getUserById(Number(idUser));
      setUser(data.data);
    };
    getUser();
  }, []);
  useEffect(() => {
    return () => {
      avatars && URL.revokeObjectURL(avatars.preview);
    };
  }, [avatars]);
  const handleAvatar = (e: any) => {
    let file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFile(file);
    setAvatars(file);
  };

  const handleEdit = (e: any): void => {
    const spanElement: HTMLElement = e.target;
    const parentElement: HTMLElement = spanElement.parentElement as HTMLElement;
    const inputElement: HTMLInputElement = parentElement.querySelector(
      ".inputProfile"
    ) as HTMLInputElement;
    inputElement.removeAttribute("disabled");
    inputElement.style.border = "1px solid var(--primary)";
    inputElement.style.borderRadius = "20px";
    inputElement.style.padding = "10px";
    console.log(inputElement.value);
  };

  const handleEditProfile = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateProfile = async () => {
    try {
      const userService = new UserService();
      if (file) {
        const url = await uploadService.uploadImage(file, "avatar");
        let newUser = {
          ...user,
          avatar: url,
        };
        await userService.editProfileUser(Number(idUser), newUser);
      } else {
        await userService.editProfileUser(Number(idUser), user);
      }
      dispatch(update());
      notifySuccess("Update Success");
      props.offProfile();
    } catch (error: any) {
      notifyError(error.response.data);
    }
  };
  return (
    <section className="profileOverlay">
      <div className="profileModal">
        <div className="imageProfile">
          <img src={avatars?.preview ? avatars?.preview : user.avatar} alt="" />
          <div className="inputFile">
            <label htmlFor="file">
              <TbPhotoEdit />
            </label>
            <input onChange={handleAvatar} id="file" type="file" />
          </div>
        </div>
        <div className="informationProfile">
          <div className="nameProfile itemProfile">
            <input
              disabled
              onChange={handleEditProfile}
              value={user.fullName}
              name="fullName"
              className="inputProfile"
              placeholder={user?.fullName}
              type="text"
            />

            <span onClick={handleEdit}>edit</span>
          </div>
          <div className="emailProfile itemProfile">
            <input
              readOnly
              name="email"
              className="inputProfile"
              placeholder={user?.email}
              type="email"
            />
          </div>
          <div className="phoneProfile itemProfile">
            <input
              disabled
              onChange={handleEditProfile}
              value={user.phone}
              className="inputProfile"
              name="phone"
              placeholder={user?.phone ? user.phone : "Add your phone"}
              type="text"
            />
            <span onClick={handleEdit}>edit</span>
          </div>
          <div className="addressProfile itemProfile">
            <textarea
              disabled
              onChange={handleEditProfile}
              value={user.address}
              className="inputProfile"
              name="address"
              placeholder={user?.address ? user.address : "Add your address"}
            />

            <span onClick={handleEdit}>edit</span>
          </div>
        </div>
        <Popconfirm
          title="Update your profile"
          description="Are you sure to UPDATE?"
          onConfirm={handleUpdateProfile}
          okText="Yes"
          cancelText="No"
        >
          <button>Update</button>
        </Popconfirm>
        <button onClick={() => props.offProfile()}>ESC</button>
      </div>
    </section>
  );
};

export default Profile;
