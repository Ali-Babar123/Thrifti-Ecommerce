import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import API from "../api/api";
import "./VerifyEmailChange.css";
import { toast } from "sonner";

const VerifyEmailChange = () => {
  const [params] = useSearchParams();
  const code = params.get("code");
  const userId = params.get("user_id");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post("/api/security/email/verify", {
        code,
        user_id: userId,
        newEmail: data.email,
      });
      toast.success("Your email has been changed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired link");
    }
  };

  return (
    <div className="email-page">
      <h1 className="page-title">Change email</h1>

      <form className="email-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="email-row">
          <label>New email</label>
          <input
            type="email"
            placeholder="Your new email"
            {...register("email", { required: true })}
          />
        </div>

        <p className="email-hint">
          We'll send a confirmation request to your new email address to finish
          the process
        </p>

        <div className="email-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Changing..." : "Change"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmailChange;
