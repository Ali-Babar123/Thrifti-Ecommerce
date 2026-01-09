import React, { useContext, useEffect, useState, useRef } from "react";
import "./ProfileDetails.css";
import { AuthContext } from "../Contexts/AuthProvider";
import userEmptyState from "/user-empty-state.svg";
import { useForm } from "react-hook-form";
import API from "../api/api";
import { toast } from "sonner";

const SellingProfileDetails = () => {
  const { user, setUser } = useContext(AuthContext);

  // image states
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // fill form from user
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        about: user.about || "",
        location: user.location?.country || "",
        city: user.location?.city || "",
        language: user.language || "",
      });
    }
  }, [user, reset]);

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // validation (optional but recommended)
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // submit
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const updateProfilePayload = {
        username:data?.username,
        about:data?.about,
        language:data?.language,
        location:{
          city:data?.city,
          country:data?.country
        },
        profileImage: selectedFile
      }
      

      const res = await API.put(
        "/api/auth/update-profile",
        updateProfilePayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Profile updated successfully");
        setPreview(null);
        setSelectedFile(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <form className="selling-profile-content" onSubmit={handleSubmit(onSubmit)}>
      <h2>Settings</h2>

      <div className="selling-profile-section">
        <h3>Profile Details</h3>

        <div className="selling-profile-header">
          <img  
            src={preview || user?.profileImage || userEmptyState}
            onError={(e) => (e.target.src = userEmptyState)}
            alt="Profile"
            className="selling-profile-image"
          />
          <span className="selling-profile-name">{user?.username}</span>
        </div>

        {/* choose photo */}
        <button
          type="button"
          className="selling-profile-btn selling-profile-choose-btn"
          onClick={() => fileRef.current.click()}
        >
          Choose photo
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={handleImageChange}
        />

        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="selling-profile-input"
          {...register("username", { required: true, minLength: 3 })}
        />

        <label>About</label>
        <textarea
          placeholder="Enter about yourself"
          className="selling-profile-textarea"
          {...register("about")}
        />

        <h3>Location</h3>

        <label>Country</label>
        <input
          type="text"
          placeholder="Enter your country"
          className="selling-profile-input"
          {...register("country")}
        />

        <label>City</label>
        <input
          type="text"
          placeholder="Enter your city"
          className="selling-profile-input"
          {...register("city")}
        />

        <label>Language</label>
        <select
          className="selling-profile-input"
          {...register("language")}
        >
          <option value="">Select</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      <div className="selling-profile-btn-group">
        <button
          type="submit"
          className="selling-profile-btn selling-profile-update-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default SellingProfileDetails;
