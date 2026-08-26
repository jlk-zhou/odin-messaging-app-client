import Button from "@mui/material/Button";

export default function DangerZone() {
  return (
    <div className="w-full">
      <h2 className="text-red-500">Danger Zone!</h2>
      <hr className="mb-5 text-red-500" />
      <div className="flex w-full justify-center">
        <Button variant="contained" color="warning" className="w-45">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
