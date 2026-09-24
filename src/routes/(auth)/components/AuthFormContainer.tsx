import React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

interface AuthFormContainerProps {
  children: React.ReactNode;
}

export default function AuthFormContainer({
  children,
}: AuthFormContainerProps) {
  return (
    <Container className="my-22 flex max-w-screen flex-col min-[475px]:px-10 sm:m-0 sm:h-screen sm:items-center sm:justify-center">
      <Paper
        className="contents min-h-170 px-8 pt-18 sm:block sm:min-w-100 md:min-w-110 md:px-12 lg:min-w-135"
        elevation={3}
      >
        {children}
      </Paper>
    </Container>
  );
}
