import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageInfoTabs } from "./PageInfoTabs";
import {
  pageInfoSchema,
  type PageInfoFormValues,
} from "./schema/pageInfo.schema";
import {
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  StyledDrawer,
  DrawerBody,
  DrawerForm,
  FooterButton,
} from "./PageConfigurationDrawer.styles";
import type { RootState } from "@store/store";
import { closePageConfigDrawer } from "@store/wireframeSlice/wireframeSlice";
import { usePageConfiguration } from "@hooks/usePageConfiguration";
import type { PageConfigurationPayload } from "@api/pageConfiguration.api";
import { usePrivilege } from "@hooks/usePrivilege";

export const PageConfigurationDrawer = () => {
  const dispatch = useDispatch();
  const { canEditWireframeConfiguration } = usePrivilege();

  const open = useSelector(
    (state: RootState) => state.wireframe.isPageConfigOpen,
  );

  const pageConfigWireframe = useSelector(
    (state: RootState) => state.wireframe.pageConfigWireframe,
  );

  const user = useSelector((state: RootState) => state.navigation?.data);

  const methods = useForm<PageInfoFormValues>({
    resolver: zodResolver(pageInfoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      pageDetails: {
        pageName: "",
        slug: "",
        description: "",
      },
      seo: {
        seoTitle: "",
        seoPageTitle: "",
        seoTopDescription: "",
        seoBottomDescription: "",
        seoMetaDescription: "",
        seoMetaKeywords: [],
        canonicalPath: "",
      },
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  useEffect(() => {
    if (!pageConfigWireframe) return;
    reset({
      pageDetails: {
        pageName: pageConfigWireframe.wireframeName ?? "",
        slug: pageConfigWireframe.slug
          ? pageConfigWireframe.slug.replace(/^\/sections\/+/, "")
          : "",
        description: pageConfigWireframe.description ?? "",
      },
      seo: {
        seoTitle: pageConfigWireframe.seo?.title ?? "",
        seoPageTitle: pageConfigWireframe.seo?.page_title ?? "",
        seoMetaDescription: pageConfigWireframe.seo?.description ?? "",
        canonicalPath: `${pageConfigWireframe.seo?.canonical_url ?? ""}`,
        seoTopDescription: `${pageConfigWireframe.seo?.topDescription ?? ""}`,
        seoBottomDescription: `${pageConfigWireframe.seo?.bottomDescription ?? ""}`,
        seoMetaKeywords: pageConfigWireframe.seo?.keywords ?? [],
      },
    });
  }, [pageConfigWireframe, reset]);

  const handleClose = () => {
    reset();
    dispatch(closePageConfigDrawer());
  };

  const { mutateAsync } = usePageConfiguration();

  const onSubmit = async (data: PageInfoFormValues) => {
    if (!pageConfigWireframe?.wireframeId) return;

    const payload: PageConfigurationPayload = {
      slug: `/sections/${data.pageDetails.slug}`,
      page_name: data.pageDetails.pageName,
      page_description: data.pageDetails.description ?? "",
      modifiedBy: user?.user?.name ?? "",
      seo: {
        title: data.seo.seoTitle ?? "",
        page_title: data.seo.seoPageTitle ?? "",
        description: data.seo.seoMetaDescription ?? "",
        keywords: data.seo.seoMetaKeywords ?? [],
        topDescription: data.seo.seoTopDescription ?? "",
        bottomDescription: data.seo.seoBottomDescription ?? "",
        breadcrumbs: [],
        meta_tags: [],
        canonical_url: data.seo.canonicalPath ?? "",
        canonical_url_domain: "",
        sitemap: {
          priority: null,
          frequency: null,
        },
      },
    };

    try {
      await mutateAsync({
        wireframeId: pageConfigWireframe.wireframeId,
        payload,
      });

      handleClose();
    } catch (error) {
      console.error("Page configuration update failed", error);
    }
  };

  return (
    <StyledDrawer anchor="right" open={open} onClose={handleClose}>
      <FormProvider {...methods}>
        <DrawerForm onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerHeader>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: "27px",
                  letterSpacing: "-0.44px",
                }}
              >
                Page Info & Configuration
              </Box>

              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DrawerHeader>

            <DrawerBody>
              <PageInfoTabs />
            </DrawerBody>

            <DrawerFooter>
              <FooterButton
                variant="outlined"
                disabled={!isValid || isSubmitting}
                sx={{
                  background: "transparent",
                  color: "#000093",
                  border: "1px solid #E0E0E0",
                  "&.Mui-disabled": {
                    color: "#000093",
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </FooterButton>

              <FooterButton
                variant="outlined"
                type="submit"
                disabled={
                  !isValid || isSubmitting || !canEditWireframeConfiguration
                }
              >
                Save
              </FooterButton>
            </DrawerFooter>
          </DrawerContent>
        </DrawerForm>
      </FormProvider>
    </StyledDrawer>
  );
};
