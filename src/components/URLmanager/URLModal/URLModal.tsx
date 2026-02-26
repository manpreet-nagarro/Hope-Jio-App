import { Dialog } from "@mui/material";
import {
  CancelButton,
  CloseButton,
  CreateButton,
  Footer,
  Header,
  Label,
  ModalContentWrapper,
  Required,
  Title,
} from "./URLModal.styles";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "@constants/theme.constants";
import { CustomAccordion } from "@components/CustomAccordion/CustomAccordion";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlFormSchema } from "./URLData.schema";
import { URLPageDetails } from "./URLPageDetails";
import { URLStoreDetails } from "./URLStoreDetails";
import type { IPlatformInfo } from "src/interfaces/Wireframes";
import { URLUserCohortsDetails } from "./URLUserCohortsDetails";
import { URLScheduler } from "./URLScheduler";
import { UI_TEXTS } from "@constants/text.constants";
import type { UrlModalFormValues } from "./URLModal.types";
import type { IUrlManager } from "@interfaces/URLManager";
import {
  WireframeAutocomplete,
  type WireframeOption,
} from "@components/common/WireframeAutocomplete";

type IProps = {
  open: boolean;
  onClose: () => void;
  filterData?: {
    store: string[];
    platform: IPlatformInfo[];
    status: string[];
    userCohorts: string[];
  };
  defaultValues?: UrlModalFormValues | null;
  isEditing?: boolean;
  onCreate: (data: IUrlManager) => void;
  onEdit: (data: IUrlManager) => void;
  isSaving?: boolean;
};

const DEFAULT_FORM_VALUES: UrlModalFormValues = {
  id: null,
  sourceWireframe: null,
  wireframeName: "",
  wireframeId: null,
  slug: "",
  platform: "",
  store: "",
  userCohorts: [],
  isScheduled: false,
  scheduleStart: null,
  scheduleEnd: null,
};

function parseDateFields(values: UrlModalFormValues) {
  const parsed = { ...values };
  if (parsed.scheduleStart && typeof parsed.scheduleStart === "string") {
    parsed.scheduleStart = new Date(parsed.scheduleStart);
  }
  if (parsed.scheduleEnd && typeof parsed.scheduleEnd === "string") {
    parsed.scheduleEnd = new Date(parsed.scheduleEnd);
  }
  return parsed;
}

const UrlModal = ({
  open,
  onClose,
  filterData,
  defaultValues,
  isEditing,
  onCreate,
  onEdit,
  isSaving,
}: IProps) => {
  const initialValues = parseDateFields(defaultValues || DEFAULT_FORM_VALUES);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isValid },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: zodResolver(urlFormSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const sourceWireframe = watch("sourceWireframe");

  const normalizedSourceWireframe = sourceWireframe
    ? { ...sourceWireframe, slug: sourceWireframe.slug ?? "" }
    : null;

  const onCloseHandler = () => {
    reset(parseDateFields(DEFAULT_FORM_VALUES));
    onClose?.();
  };

  useEffect(() => {
    if (!open) return;
    reset(parseDateFields(defaultValues || DEFAULT_FORM_VALUES));
  }, [open, defaultValues, reset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const updatedData = {
        ...data,
      }
      let updatedCohorts = data?.userCohorts?.map((c: string) => {
        const idx = filterData?.userCohorts?.indexOf(c);
        return typeof idx === "number" && idx > -1 ? idx : c;
      }) || [];
      updatedCohorts = updatedCohorts.map((c: number) => ({id : c + 1}))
      updatedData.userCohorts = updatedCohorts?.filter((c : {id: string}) => !String(c.id).includes("All")) || [];
    if (data?.id) {
      onEdit(updatedData);
    } else {
      onCreate(updatedData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            boxShadow: "0px 25px 50px -12px #00000040",
            borderRadius: "1rem",
            backgroundColor: COLORS.BACKGROUND_LIGHTER,
            width: "684px",
            maxWidth: "684px",
          },
          elevation: 0,
        },
      }}
    >
      <Header>
        <Title>
          {isEditing
            ? UI_TEXTS.LABEL.EDIT_URL_MAPPING_LABEL
            : UI_TEXTS.LABEL.CREATE_URL_MAPPING_LABEL}
        </Title>
        <CloseButton onClick={onCloseHandler}>
          <CloseIcon fontSize="small" sx={{ color: COLORS.PLACEHOLDER_TEXT }} />
        </CloseButton>
      </Header>
      <ModalContentWrapper>
        <CustomAccordion label={UI_TEXTS.pageUrl}>
          <Label>
            {UI_TEXTS.page}<Required>*</Required>
          </Label>
          <WireframeAutocomplete
            value={
              normalizedSourceWireframe &&
              typeof normalizedSourceWireframe.slug === "string" &&
              typeof normalizedSourceWireframe.wireframeId === "string" &&
              typeof normalizedSourceWireframe.wireframeName === "string"
                ? normalizedSourceWireframe
                : null
            }
            onChange={(val: WireframeOption | null) => {
              const fieldMap = {
                slug: val ? `${val?.slug?.toLowerCase().replaceAll(/\s+/g, "-")}` : "",
                platform: val?.platform || "",
                store: val?.store || "",
                wireframeName: val?.wireframeName || "",
                wireframeId: val?.wireframeId || "",
                sourceWireframe: val,
              };
              Object.entries(fieldMap).forEach(([key, value]) => {
                setValue(key, value, { shouldValidate: true });
              });
            }}
            required
          />

          <URLPageDetails
            watch={watch}
            errors={errors}
            register={register}
          />
        </CustomAccordion>
        <CustomAccordion label={UI_TEXTS.storemapping}>
          <URLStoreDetails register={register} />
        </CustomAccordion>
        <CustomAccordion label={UI_TEXTS.userCohort}>
          <URLUserCohortsDetails
            userCohorts={filterData?.userCohorts || []}
            control={control}
          />
        </CustomAccordion>
        <CustomAccordion label={UI_TEXTS.scheduler}>
          <URLScheduler
            setValue={setValue}
            control={control}
          />
        </CustomAccordion>
      </ModalContentWrapper>
      <Footer>
        <CancelButton onClick={onCloseHandler}>Cancel</CancelButton>
        <CreateButton
          disabled={!isValid || isSaving}
          onClick={handleSubmit(onSubmit)}
        >
          {isEditing ? UI_TEXTS.updateUrl : UI_TEXTS.createUrl}
        </CreateButton>
      </Footer>
    </Dialog>
  );
};

export default UrlModal;
