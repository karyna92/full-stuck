import "./userStyles.css";

const UserProfile = ({ user }) => {
  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="user-profile">
      <h1>Welcome, {user.firstName}</h1>
      <img
        src={
          user?.avatar
            ? `http://localhost:5001/api/${user.avatar}`
            : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
        }
        alt={`${user.firstName} avatar`}
        className="user-avatar"
      />
    </div>
  );
};

export default UserProfile;
