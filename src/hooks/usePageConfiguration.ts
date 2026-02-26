import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postPageConfiguration,
  type PageConfigurationPayload,
} from "@api/pageConfiguration.api";
import { useToast } from "./useToast";
import { PAGE_CONFIG_SAVE } from "@utils/messages";

interface PageConfigurationVariables {
  wireframeId: string;
  payload: PageConfigurationPayload;
}

export const usePageConfiguration = () => {
  const queryClient = useQueryClient();
  const { show } = useToast();

  return useMutation({
    mutationFn: ({ wireframeId, payload }: PageConfigurationVariables) =>
      postPageConfiguration(wireframeId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wireframes"] });
      show({
      message: PAGE_CONFIG_SAVE,
    });
    },
  });
};
