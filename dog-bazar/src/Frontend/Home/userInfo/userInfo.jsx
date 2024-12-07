import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { DataContext } from "../../../Navbar/ContextApi";

function UserInfo(props) {
  const { userHai }  =useContext(DataContext)
const idUser =userHai?.data?._id
  const prop = { props };
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    address: "",
    profilePicture: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const userId = prop.props.userInfo._id;

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/userInfo/${idUser}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (idUser) {
      fetchUserData();
    }
  }, [idUser]);

  // Handle input changes for user name and address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle profile picture change and upload to Cloudinary
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicturePreview(imageUrl); // Preview image

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dogbazarprofile"); // Your Cloudinary preset

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dishdojeh/image/upload", 
          { method: "POST", body: formData }
        );
        const data = await response.json();
        if (data.secure_url) {
          setUser((prevState) => ({ ...prevState, profilePicture: data.secure_url }));
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  // Handle form submission for name and email update
  const handleSubmitNameAndEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", user.fullName);
    formData.append("email", user.email);
    formData.append("profilePicture", user.profilePicture);

    try {
      const response = await fetch(`/api/userji/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user name and email");
      }
      console.log("User name and email updated successfully!");
    } catch (error) {
      console.error("Error updating user name and email:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for address update
  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("address", user.address);

    try {
      const response = await fetch(`/api/userkapata/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user address");
      }
      console.log("User address updated successfully!");
    } catch (error) {
      console.error("Error updating user address:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for password update
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (password) formData.append("password", password);

    try {
      const response = await fetch(`/api/userPasswordChange/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error updating user password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto    p-6 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">Update User Information</h2>

      {/* First Part: User Name and Profile Picture */}
      <div className="space-y-6">
       
        <form onSubmit={handleSubmitNameAndEmail} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="flex justify-start  mb-6">
            <img
              src={profilePicturePreview || user.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 border-orange-600 border
              border-4 rounded-full object-cover" />
            <div className="ml-4">
              <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-600">Change Profile Picture</label>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Name and Email */}
          <div className="flex flex-col">
            <label className="text-gray-700">Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName || ""}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Name & Picture"}
          </button>
        </form>
      </div>

      {/* Second Part: Address */}
      <div className="space-y-6 mt-10">
        <h3 className="text-2xl font-semibold text-gray-700">Update Address</h3>
        <form onSubmit={handleSubmitAddress} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Address</label>
            <textarea
              name="address"
              value={user.address || ""}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>

      {/* Third Part: Password */}
      <div className="space-y-6 mt-10">
        <h3 className="text-2xl font-semibold text-gray-700">Update Password</h3>
        <form onSubmit={handleSubmitPassword} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">New Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              aria-label="New Password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
