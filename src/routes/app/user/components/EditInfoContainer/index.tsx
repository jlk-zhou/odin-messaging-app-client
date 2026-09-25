import React from "react";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

interface NameContainerProps {
  info: string;
  children: React.ReactNode;
}
/**
 * Wrapper for user credentials, includes an edit button that appears on hover.
 * @param children - the children prop, which will be a React component for the credentials.
 * @returns A react component that can be used to wrap user credentials
 */
export default function EditInfoContainer({
  info = "",
  children,
}: NameContainerProps) {
  return (
    <div className="group grid w-full grid-cols-5 place-items-center">
      {children}
      <Button
        className="col-start-5 bg-transparent p-0"
        aria-label={`Edit ${info}`}
      >
        <EditIcon className="cursor-pointer fill-black md:hidden md:group-hover:block" />
      </Button>
    </div>
  );
}
