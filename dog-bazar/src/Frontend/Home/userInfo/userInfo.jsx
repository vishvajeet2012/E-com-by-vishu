import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function UserInfo(props) {
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

  const userId = prop.props.userInfo._id; // Extract _id from prop

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/userInfo/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle form submission for password update
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

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
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-center text-2xl font-semibold mb-6">Update User</h2>

      {/* First Part: User Name and Profile Picture */}
      <div>
        <h3 className="text-lg font-semibold">Update Name and Profile Picture</h3>
        <form onSubmit={handleSubmitNameAndEmail} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="text-center mb-6">
            <img
              src={profilePicturePreview || user.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="mx-auto w-24 h-24 rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-4"
            />
          </div>

          {/* Name and Email */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Name & Picture"}
          </button>
        </form>
      </div>

      {/* Second Part: Address */}
      <div>
        <h3 className="text-lg font-semibold">Update Address</h3>
        <form onSubmit={handleSubmitAddress} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              name="address"
              value={user.address || ""}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>

      {/* Third Part: Password */}
      <div>
        <h3 className="text-lg font-semibold">Update Password</h3>
        <form onSubmit={handleSubmitPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              aria-label="New Password"
              className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
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
