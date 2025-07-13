const PersonalInfo = ({user}) => { 
return (
  <>
    <h2>Personal Info</h2>
    <p>
      <strong>Email:</strong> {user.email}
    </p>
    <p>
      <strong>Birthday:</strong>{" "}
      {user.birthday ? new Date(user.birthday).toLocaleDateString() : "N/A"}
    </p>
    <p>
      <strong>Address:</strong> {user.address || "Not provided"}
    </p>
  </>
);
}
export default PersonalInfo;