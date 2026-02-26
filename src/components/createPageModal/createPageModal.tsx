import { useCallback, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardActionArea, InputAdornment } from "@mui/material";
import { WireframeAutocomplete } from "../common/WireframeAutocomplete";
import type { WireframeOption } from "../common/WireframeAutocomplete";
import {
  createWireframeSchema,
  type CreateWireframeFormData,
} from "../../schemas/createWireframe.schema";
import { CREATE_WIREFRAME_TEXT } from "../../constants/createWirreframe.constants";
import { slugify } from "../../utils/slugify";

import {
  Header,
  Title,
  CloseButton,
  Content,
  Section,
  SectionTitle,
  Label,
  Required,
  SlugHelperText,
  PlatformGrid,
  StoreGrid,
  StoreChip,
  ErrorText,
  Footer,
  CancelButton,
  CreateButton,
  StyledTextField,
  StyledPlatformCard,
  ActionGrid,
  StyledActionCard,
  ActionIcon,
  ActionTitle,
  StyledPlatformTitle,
  SvgNormalize,
  CardContentCenter,
} from "./createPageModal.styles";

import CreateNewIcon from "@assets/icons-svg/createNewPage/createNewIcon";
import CopyExistingIcon from "@assets/icons-svg/createNewPage/copyExistingIcon";
import type { ICreateWireframePayload } from "src/interfaces/createPageModal";
import type { IWireframeFilterData } from "@interfaces/Wireframes";
import * as WireframeListIcons from "@assets/icons-svg/wireframeList";
import { urlToPascalCaseKey } from "@utils/commonUtils";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";

const getIconComponent = (
  iconPath: string,
): React.ComponentType<{ color?: string }> | null => {
  const key = urlToPascalCaseKey(iconPath);
  return (
    (
      WireframeListIcons as Record<
        string,
        React.ComponentType<{ color?: string }>
      >
    )[key] || null
  );
};

type IProps = {
  open: boolean;
  onClose: () => void;
  filterData?: IWireframeFilterData;
  onCreate?: (payload: ICreateWireframePayload) => void;
  isSaving?: boolean;
};

const DEFAULT_FORM_VALUES: CreateWireframeFormData & {
  sourceWireframe: WireframeOption | null;
} = {
  pageName: "",
  slug: "",
  platformName: "",
  store: "",
  actionType: "" as any,
  sourceWireframe: null,
};

const CreateWireframeModal = ({
  open,
  onClose,
  filterData,
  onCreate,
  isSaving,
}: IProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateWireframeFormData>({
    resolver: zodResolver(createWireframeSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const selectedWireframe = useSelector((state: RootState) => state.wireframe.selectedWireframe);

  const pageName = watch("pageName");
  const platformName = watch("platformName");
  const selectedStore = watch("store");
  const actionType = watch("actionType");
  const selectedSourceWireframe = watch("sourceWireframe");
  const normalizedSourceWireframe = selectedSourceWireframe
    ? { ...selectedSourceWireframe, slug: selectedSourceWireframe.slug ?? "" }
    : null;

  useEffect(() => {
    if(!open) return;
    reset({ ...DEFAULT_FORM_VALUES });

    if(selectedWireframe) {
      setValue("actionType", "COPY", {shouldValidate: true});
      setValue("sourceWireframe", {
        wireframeId: selectedWireframe.wireframeId,
        wireframeName: selectedWireframe.wireframeName,
        platform: selectedWireframe.platform,
        store: selectedWireframe.store,
        status: selectedWireframe.status,
      },
      { shouldValidate: true}
      );
      setValue("platformName", selectedWireframe.platform, { shouldValidate: true});
      setValue("store", selectedWireframe.store, { shouldValidate: true});
    }

  }, [open, reset, selectedWireframe, setValue]);

  /* ---------------- Slug Sync ---------------- */
  useEffect(() => {
    const formatted = slugify(pageName);
    setValue("slug", formatted, { shouldValidate: false });
  }, [pageName, setValue]);

  useEffect(() => {
    if(actionType !== "COPY") return;

    if (selectedSourceWireframe) {
      setValue("platformName", selectedSourceWireframe.platform, {
        shouldValidate: true,
      });
      setValue("store", selectedSourceWireframe.store, {
        shouldValidate: true,
      });
    } else {
      setValue("platformName", "", {
        shouldValidate: true,
      });
      setValue("store", "", {
        shouldValidate: true,
      });
    }
  }, [actionType, setValue, selectedSourceWireframe]);

  const handlePlatformSelect = useCallback(
    (platformName: string) => {
      if (actionType === "COPY") return;
      setValue("platformName", platformName, { shouldValidate: true });
    },
    [setValue, actionType],
  );

  const handleStoreSelect = useCallback(
    (store: string) => {
      if (actionType === "COPY") return;
      setValue("store", store, { shouldValidate: true });
    },
    [setValue, actionType],
  );

  const handleActionTypeSelect = useCallback(
    (action: "NEW" | "COPY") => {
      setValue("actionType", action, { shouldValidate: true });
      setValue("platformName", "");
      setValue("store", "");
      setValue("sourceWireframe", null);
    },
    [setValue],
  );

  /* ---------------- Submit ---------------- */
  const onSubmit = (data: CreateWireframeFormData) => {
    if (!onCreate) return;

    onCreate({
      ...(data.pageName ? { wireframeName: data.pageName } : null),
      ...(data.slug ? { slug: `/sections${data.slug}` } : null),
      ...(data.platformName ? { platformName: data.platformName } : null),
      ...(data.store ? { store: data.store } : null),
      actionType: data.actionType,
      sourceWireframeid:
        data.actionType === "COPY"
          ? data.sourceWireframe?.wireframeId || ""
          : "",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          boxShadow: "0px 25px 50px -12px #00000040",
        },
      }}
    >
      <Header>
        <Title>{CREATE_WIREFRAME_TEXT.TITLE}</Title>
        <CloseButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseButton>
      </Header>

      <Content>
        {/* Page Basics */}
        <Section>
          <SectionTitle>{CREATE_WIREFRAME_TEXT.PAGE_BASICS}</SectionTitle>

          <Label>
            {CREATE_WIREFRAME_TEXT.PAGE_NAME_LABEL}
            {actionType === "NEW" && <Required>*</Required>}
          </Label>
          <StyledTextField
            variant="standard"
            placeholder="Enter page name"
            {...register("pageName")}
          />
          {errors.pageName && <ErrorText>{errors.pageName.message}</ErrorText>}

          <Label>{CREATE_WIREFRAME_TEXT.SLUG_LABEL}</Label>
          <StyledTextField
            variant="standard"
            {...register("slug")}
            placeholder="/page-slug"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    mr: -1,
                  }}
                >
                  /sections
                </InputAdornment>
              ),
            }}
          />
          <SlugHelperText>{CREATE_WIREFRAME_TEXT.SLUG_HELPER}</SlugHelperText>
          {errors.slug && <ErrorText>{errors.slug.message}</ErrorText>}
        </Section>

        {/* Action Type */}
        <Section>
          <SectionTitle>
            {CREATE_WIREFRAME_TEXT.ACTION_TYPE_LABEL} <Required>*</Required>
          </SectionTitle>
          <ActionGrid>
            {Object.values(CREATE_WIREFRAME_TEXT.ACTION_TYPES).map((action) => {
              const isActive = actionType === action.value;
              const iconColor = isActive ? "#000093" : "#595959";
              return (
                <StyledActionCard
                  key={action.value}
                  active={actionType === action.value}
                >
                  <CardActionArea
                    onClick={() =>
                      handleActionTypeSelect(action.value as "NEW" | "COPY")
                    }
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      padding: "1.25rem",
                      alignItems: "center",
                    }}
                  >
                    <SvgNormalize className="action-icon">
                      {action.value === "NEW" && (
                        <ActionIcon>
                          <CreateNewIcon fill={iconColor} color={iconColor} />
                        </ActionIcon>
                      )}
                      {action.value === "COPY" && (
                        <ActionIcon>
                          <CopyExistingIcon
                            fill={iconColor}
                            color={iconColor}
                          />
                        </ActionIcon>
                      )}
                    </SvgNormalize>
                    <ActionTitle active={isActive}>{action.title}</ActionTitle>
                  </CardActionArea>
                </StyledActionCard>
              );
            })}
          </ActionGrid>
        </Section>

        {/* COPY Dropdown */}
        {actionType === "COPY" && (
          <Section>
            <Label>
              {CREATE_WIREFRAME_TEXT.ACTION_TYPES.COPY.sourceWireframe}{" "}
              <Required>*</Required>
            </Label>
            <WireframeAutocomplete
              value={normalizedSourceWireframe}
              onChange={(val: WireframeOption | null) =>
                setValue("sourceWireframe", val, { shouldValidate: true })
              }
              platformName={platformName}
              store={selectedStore}
              required
            />
            {errors.sourceWireframe && (
                <ErrorText>{errors.sourceWireframe.message}</ErrorText>
              )}
          </Section>
        )}
        
        {actionType && (
          <>
            {/* Platform */}
            <Section>
              <SectionTitle>
                {CREATE_WIREFRAME_TEXT.PLATFORM_LABEL}{" "}
                {actionType === "NEW" && <Required>*</Required>}
              </SectionTitle>
              <PlatformGrid>
                {filterData?.platform.map((platform) => {
                  const Icon = platform?.iconPath
                    ? getIconComponent(platform.iconPath)
                    : null;
                  return (
                    <StyledPlatformCard
                      key={platform.id}
                      active={platformName === platform.name}
                      readonly={actionType === "COPY"}
                    >
                      <CardActionArea
                        onClick={() =>
                          actionType === "NEW" &&
                          handlePlatformSelect(platform.name)
                        }
                        sx={{
                          padding: "12px 26px",
                        }}
                      >
                        <CardContentCenter>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              marginBottom: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {Icon ? (
                              <Icon
                                color={
                                  platformName === platform.name
                                    ? "#000093"
                                    : "#595959"
                                }
                              />
                            ) : null}
                          </div>
                          <StyledPlatformTitle>
                            {platform.name}
                          </StyledPlatformTitle>
                        </CardContentCenter>
                      </CardActionArea>
                    </StyledPlatformCard>
                  );
                })}
              </PlatformGrid>
              {errors.platformName && (
                <ErrorText>{errors.platformName.message}</ErrorText>
              )}
            </Section>

            {/* Store */}
            <Section>
              <SectionTitle>
                {CREATE_WIREFRAME_TEXT.STORE_LABEL}{" "}
                {actionType === "NEW" && <Required>*</Required>}
              </SectionTitle>
              <StoreGrid>
                {filterData?.store.map((store) => (
                  <StoreChip
                    key={store}
                    label={store}
                    onClick={() =>
                      actionType === "NEW" && handleStoreSelect(store)
                    }
                    active={selectedStore === store}
                    readonly={actionType === "COPY"}
                  />
                ))}
              </StoreGrid>
              {errors.store && <ErrorText>{errors.store.message}</ErrorText>}
            </Section>
          </>
        )}
      </Content>

      <Footer>
        <CancelButton onClick={onClose}>
          {CREATE_WIREFRAME_TEXT.CANCEL}
        </CancelButton>
        <CreateButton
          disabled={!isValid || isSaving}
          onClick={handleSubmit(onSubmit)}
        >
          {CREATE_WIREFRAME_TEXT.CREATE}
        </CreateButton>
      </Footer>
    </Dialog>
  );
};

export default CreateWireframeModal;
