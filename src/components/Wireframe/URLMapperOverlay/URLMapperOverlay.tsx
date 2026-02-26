import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import { closeUrlMapperOverlay } from "../../../store/wireframeSlice/wireframeSlice";
import type { RootState } from "@store/store";

import {
  StyledDrawer,
  OverlayContainer,
  OverlayHeader,
  OverlayBody,
  Footer,
  FooterButton,
} from "./URLMapperOverlay.styles";
import UrlMappingSection from "./shared/UrlMappingSection";
import InfoIcon from "@assets/icons-svg/infoIcon";
import { Divider } from "@mui/material";
import type { IUrlMapping } from "src/interfaces/Wireframes";

const URLMapperOverlay = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.wireframe.isUrlMapperOpen
  );

  const selectedWireframe = useSelector(
    (state: RootState) => state.wireframe.selectedWireframe
  );

  const buildTitle = (status: string | undefined) =>
    `${status?.toLowerCase() ?? ""} URL`;

  const getUrlKey = (url: IUrlMapping, index: number) =>
    url.wireframeId ?? `${url.pageUri}-${index}`;

  return (
    <StyledDrawer
      anchor="right"
      open={isOpen}
      onClose={() => dispatch(closeUrlMapperOverlay())}
    >
      <OverlayContainer>
        <OverlayHeader>
          <Box>
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
              Mapped URLs <InfoIcon />
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "18px",
                color: "#6E6E6E",
                letterSpacing: "0px",
                marginTop: "8px",
              }}
            >
              Page: {selectedWireframe?.wireframeName ?? ""}
            </Typography>
          </Box>

          <IconButton onClick={() => dispatch(closeUrlMapperOverlay())}>
            <CloseIcon />
          </IconButton>
        </OverlayHeader>

        <OverlayBody>
          {selectedWireframe?.urlsMapped.map((url, index) => (
            <Box key={getUrlKey(url, index)}>
              <UrlMappingSection
                key={getUrlKey(url, index)}
                title={buildTitle(url?.status)}
                statusLabel={url?.status === "ACTIVE" ? "Active" : "Inactive"}
                status={url?.status?.toLowerCase()}
                data={[url]}
                defaultOpen={url?.status?.toLowerCase() === "active"}
              />

              {index !== selectedWireframe?.urlsMapped.length - 1 && <Divider sx={{ mx: 1, mt: 1 }} />}
            </Box>
          ))}
        </OverlayBody>

        <Footer>
          <FooterButton variant="contained" startIcon={<AddIcon />}>
            Add New URL Mapping
          </FooterButton>
        </Footer>
      </OverlayContainer>
    </StyledDrawer>
  );
};

export default URLMapperOverlay;
