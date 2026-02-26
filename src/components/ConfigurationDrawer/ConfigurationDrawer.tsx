import { zodResolver } from "@hookform/resolvers/zod";
import { useCohortConfig } from "@hooks/useCohortConfig";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@store/store";
import { closeConfigurationDrawer } from "@store/UISlice/UISlice";

import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerForm,
  DrawerHeader,
  FooterButton,
  StyledDrawer,
} from "./ConfigurationDrawer.styles";

import { PageInfoTabs } from "./PageInfoTabs";

import {
  configurationSchema,
  type ConfigurationFormValues,
} from "./schema/configuration.schema";
import { usePrivilege } from "@hooks/usePrivilege";

export const ConfigurationDrawer = () => {
  const dispatch = useDispatch();
  useCohortConfig();
  const { canEditSlotConfiguration, canEditComponentConfiguration } =
    usePrivilege();

  const open = useSelector((state: RootState) => state.ui.isConfigurationOpen);

  const { activeComponentIndex, activeSlotIndex } = useSelector(
    (state: RootState) => state.slots,
  );

  const isComponentSelected =
    activeSlotIndex !== null && activeComponentIndex !== null;

  const methods = useForm<ConfigurationFormValues>({
    resolver: zodResolver(configurationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      slotsSchema: {
        slotType: "",
        schedules: [],
      },
      componentsSchema: {
        userCohort: [],
        schedules: [],
        abTestTags: [],
        ctaLink: "",
        __isActive: false,
      },
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting },
    watch,
    setValue,
  } = methods;

  useEffect(() => {
    setValue("componentsSchema.__isActive", isComponentSelected, {
      shouldValidate: true,
    });
  }, [isComponentSelected, setValue]);

  const handleClose = () => {
    reset();
    dispatch(closeConfigurationDrawer());
  };

  const schedules = watch("slotsSchema.schedules") || [];

  const hasEmptySchedule = schedules.some(
    (s) => !s?.startDateTime || !s?.endDateTime,
  );

  const hasSameTime = schedules.some(
    (s) =>
      s?.startDateTime &&
      s?.endDateTime &&
      s.startDateTime.getTime() === s.endDateTime.getTime(),
  );

  const hasOverlap = schedules.some((current, index) => {
    if (!current?.startDateTime || !current?.endDateTime) return false;

    const currentStart = current.startDateTime;
    const currentEnd = current.endDateTime;

    return schedules.some((other, i) => {
      if (i === index) return false;
      if (!other?.startDateTime || !other?.endDateTime) return false;

      const otherStart = other.startDateTime;
      const otherEnd = other.endDateTime;

      return currentStart < otherEnd && currentEnd > otherStart;
    });
  });

  const hasScheduleErrors = hasEmptySchedule || hasSameTime || hasOverlap;

  const onSubmit = (data: ConfigurationFormValues) => {
    console.log("data", data);
    handleClose();
  };

  return (
    <StyledDrawer anchor="right" open={open} onClose={handleClose}>
      <FormProvider {...methods}>
        <DrawerForm onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerHeader>
              <Box fontSize={16} fontWeight={700}>
                Configurations
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
                onClick={handleClose}
              >
                Cancel
              </FooterButton>

              <FooterButton
                variant="outlined"
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
                  hasScheduleErrors ||
                  !(canEditSlotConfiguration || canEditComponentConfiguration)
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
