import Button from "@mui/material/Button";

export default function Options() {
  return (
    <div className="my-5 flex flex-col gap-3">
      <Button variant="contained" className="w-45">
        Change Password
      </Button>
      <Button variant="contained">Log Out</Button>
    </div>
  );
}
