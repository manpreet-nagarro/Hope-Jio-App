import FileUploadIcon from "@assets/icons-svg/fileUploadicon";
import RemoveIcon from "@assets/icons-svg/removeIcon";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef, useState } from "react";
import {
  ActionIconButton,
  FileName,
  HiddenInput,
  LeftContent,
  RightActions,
  RowContainer,
  RowDivider,
  RowLabel,
  UploadingText,
} from "../PageInfoTabs.styles";
import { usePrivilege } from "@hooks/usePrivilege";

const ALLOWED_EXTENSIONS = ["csv", "xls", "xlsx"];

const ALLOWED_MIME_TYPES = [
  "text/csv",
  "application/csv",
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

type Props = {
  title: string;
};

export const UploadRow = ({ title }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { canEditWireframeConfiguration } = usePrivilege();

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();

    const isValidExtension =
      extension && ALLOWED_EXTENSIONS.includes(extension);

    const isValidMime = ALLOWED_MIME_TYPES.includes(file.type);

    if (!isValidExtension || !isValidMime) {
      alert("Only Excel (.xls, .xlsx) or CSV (.csv) files are allowed");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);
    setFileName(file.name);

    // simulate API upload
    setTimeout(() => {
      setUploading(false);
    }, 1500);
  };

  const handleRemove = () => {
    setFileName(null);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <RowContainer>
        <LeftContent>
          <RowLabel>{title}</RowLabel>

          {fileName && (
            <FileName>
              {fileName}
              {uploading && <UploadingText>Uploading File...</UploadingText>}
            </FileName>
          )}
        </LeftContent>

        <RightActions>
          {uploading ? (
            <CircularProgress size={16} sx={{ color: "#000093" }} />
          ) : (
            <ActionIconButton
              size="small"
              onClick={handleUploadClick}
              disabled={!canEditWireframeConfiguration}
            >
              <FileUploadIcon />
            </ActionIconButton>
          )}

          {fileName && !uploading && (
            <ActionIconButton
              size="small"
              onClick={handleRemove}
              disabled={!canEditWireframeConfiguration}
            >
              <RemoveIcon />
            </ActionIconButton>
          )}

          <HiddenInput
            ref={inputRef}
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileChange}
          />
        </RightActions>
      </RowContainer>

      <RowDivider />
    </>
  );
};
