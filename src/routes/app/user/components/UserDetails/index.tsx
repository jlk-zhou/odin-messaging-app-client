import EditInfoContainer from "../EditInfoContainer";

export default function UserDetails() {
  return (
    <>
      {" "}
      {/* Email */}
      <div>
        <h2 className="ml-2">Email</h2>
        <EditInfoContainer info="email">
          <p className="col-span-4 col-start-1 ml-2 self-center justify-self-start">
            zachjoe@example.com
          </p>
        </EditInfoContainer>
      </div>
      {/* Bio */}
      <div className="mb-15">
        <h2 className="ml-2">Bio</h2>
        <EditInfoContainer info="bio">
          <p className="col-span-4 col-start-1 ml-2 self-center justify-self-start">
            Not your average gay
          </p>
        </EditInfoContainer>
      </div>
    </>
  );
}
