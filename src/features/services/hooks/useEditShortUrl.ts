import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { EDIT_SHORT_URL, EditShortUrlResult, EditShortUrlVariables } from "../api/mutations/editShortUrl";

export const useEditShortUrl = () => {
  const { mutation, data } = useTimeriseMutation<EditShortUrlResult, EditShortUrlVariables>({
    mutation: EDIT_SHORT_URL,
    loader: "UPDATE_SERVICE_SHORT_URL",
    trigger: "SERVICE",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return { mutation, data };
};
