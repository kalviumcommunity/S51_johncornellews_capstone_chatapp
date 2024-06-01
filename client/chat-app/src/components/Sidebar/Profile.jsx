import { useRef, useState } from "react";
import { useStore } from "../../app/store";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";

const Profile = () => {
  const authUser = useStore((state) => state.authUser);
  const setAuthUser = useStore().setAuthUser;
  const modRef = useRef();
  const {
    register,
    handleSubmit,
  } = useForm();
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const uploadImageAndSubmit = async (data) => {
    if (!newImage && !data.fullName) return;
    if (newImage) {
      const storageRef = ref(
        storage,
        `images/${authUser.uid}/${newImage.name}`
      );
      await uploadBytes(storageRef, newImage);
      const imageUrl = await getDownloadURL(storageRef);
      data.profilePic = imageUrl; // Add imageUrl to the form data
    }
    try {
      const res = await axios.post(
        "http://localhost:7777/api/users/updateuser",
        { data },
        { withCredentials: true }
      );
      console.log(res)
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-around mb-6">
        <h1>Hello {authUser?.fullName}</h1>
        <div className="avatar">
          <div
            onClick={() => {
              modRef.current.showModal();
            }}
            className="rounded-full w-7"
          >
            <img src={authUser.profilePic} alt="Profile" />
          </div>
        </div>
      </div>
      <dialog ref={modRef} id="my_modal_2" className="modal">
        <div className="modal-box justify-around flex items-center ">
          <span>You can edit your profile </span>
          <form
            onSubmit={handleSubmit(uploadImageAndSubmit)}
            className="flex flex-col items-center"
          >
            <label htmlFor="profilepic">
              <img
                src={authUser.profilePic}
                className="h-64 w-64"
                alt="Profile"
              />
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="profilepic"
              onChange={handleImageChange}
            />
            <input
              type="text"
              {...register("fullName")}
              defaultValue={authUser.fullName}
            />
            <p>
              Username: <span>{authUser.username}</span>
            </p>
            <button type="submit">Submit</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Profile;
