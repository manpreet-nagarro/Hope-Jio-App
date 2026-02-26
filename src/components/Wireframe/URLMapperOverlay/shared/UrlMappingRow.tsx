import type { IUrlMapping } from "src/interfaces/Wireframes";
import {
  RowWrapper,
  MetaInfo,
  Actions,
  MetaText,
  ActionButton,
} from "./UrlMappingRow.styles";
import { Box } from "@mui/material";

interface Props {
  data: IUrlMapping;
}

const UrlMappingRow = ({ data }: Props) => {
  const isActive = data.status === "active";

  return (
      <RowWrapper>
        <Box
          sx={{
            fontSize: 16,
            lineHeight: "21px",
            fontWeight: 500,
            letterSpacing: "-0.15px",
            color: "#3535F3",
            cursor: "pointer",
          }}
        >
          {(data?.pageUri ?? "") + (data?.slug ?? "")}
        </Box>

        <MetaInfo>
          <MetaText>
            User Visibility: {data?.predicate?.user?.user_type}
          </MetaText>

          <MetaText>
            Last Updated: {data.modifiedAt ?? "N/A"}
          </MetaText>
        </MetaInfo>

        <Actions>
          {isActive ? (
            <>
              <ActionButton>Edit URL Mapping</ActionButton>
              <ActionButton
                sx={{ border: "1px solid #F50031", color: "#F50031" }}
              >
                Deactivate
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton>Activate URL</ActionButton>
              <ActionButton>Edit</ActionButton>
              <ActionButton sx={{ border: "none", color: "#F50031" }}>
                Remove
              </ActionButton>
            </>
          )}
        </Actions>
      </RowWrapper>
  );
};

export default UrlMappingRow;
