import EditInfoContainer from "../EditInfoContainer";

interface UserDetailsProps {
  email: string;
  bio?: string | null | undefined;
}

export default function UserDetails({ email, bio }: UserDetailsProps) {
  return (
    <>
      {/* Email */}
      <div>
        <h2 className="ml-2">Email</h2>
        <EditInfoContainer info="email">
          <p className="col-span-4 col-start-1 ml-2 self-center justify-self-start">
            {email}
          </p>
        </EditInfoContainer>
      </div>
      {/* Bio */}
      <div className="mb-15">
        <h2 className="ml-2">Bio</h2>
        <EditInfoContainer info="bio">
          <p className="col-span-4 col-start-1 ml-2 self-center justify-self-start">
            {bio ? bio : "Write something..."}
          </p>
        </EditInfoContainer>
      </div>
    </>
  );
}
