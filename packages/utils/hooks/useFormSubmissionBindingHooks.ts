import { useEffect } from "react";
import { useFormSubmissionContext } from "../context/global/FormSubmissionContext";

export const useFormSubmissionBindingHooks = (
  isValid: boolean,
  cb: AsyncFunction
) => {
  const formSubmission = useFormSubmissionContext();

  useEffect(() => {
    formSubmission.init({ enabled: isValid, cb });
    return () => {
      formSubmission.reset();
    };
  }, []);

  useEffect(() => {
    if (isValid) {
      formSubmission.enable();
      return () => {
        formSubmission.disable();
      };
    }
    formSubmission.disable();
  }, [isValid]);
};
