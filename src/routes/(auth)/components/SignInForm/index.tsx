import * as _ from "lodash-es";
import Button from "@mui/material/Button";
import AuthField from "../AuthField";

interface SignInFormProps {
  className?: string;
  mode: "email" | "username";
  form: any;
  onSubmit: any;
}

export default function SignInForm({
  className,
  mode,
  form,
  onSubmit,
}: SignInFormProps) {
  return (
    <form
      aria-label={`${_.capitalize(mode)} Sign In Form`}
      className={`flex h-fit flex-col items-center gap-5 ${className}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <AuthField entry={mode} form={form} />
      <AuthField entry="password" form={form} />
      <Button
        loading={form.formState.isSubmitting}
        type="submit"
        variant="contained"
        className={`w-30`}
      >
        Sign In
      </Button>
    </form>
  );
}
