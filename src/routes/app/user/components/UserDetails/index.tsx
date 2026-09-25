import EditInfoContainer from "../EditInfoContainer";

interface UserDetailsProps {
  email: string;
  bio?: string | null | undefined;
  className?: string;
}

export default function UserDetails({
  email,
  bio,
  className,
}: UserDetailsProps) {
  return (
    <div className={`${className}`}>
      {/* Email */}
      <div>
        <h2 className="ml-2 font-bold">Email</h2>
        <EditInfoContainer info="email">
          <p className="col-span-4 col-start-1 ml-2 self-center justify-self-start">
            {email}
          </p>
        </EditInfoContainer>
      </div>
      {/* Bio */}
      <div>
        <h2 className="ml-2 font-bold">Bio</h2>
        <EditInfoContainer info="bio">
          <p className="col-span-4 col-start-1 ml-2 self-center justify-self-start">
            {bio ? bio : "Write something..."}
          </p>
        </EditInfoContainer>
      </div>
    </div>
  );
}
