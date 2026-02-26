import { Box } from "@mui/material";
import { CTAButton } from "./HotspotsProperties.styles";
import { useDispatch } from "react-redux";
import { nextStep } from "@store/creativeSlice/creativeSlice";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export default function HotspotsProperties() {
  const dispatch = useDispatch();

  const handleProceed = () => {
    dispatch(nextStep());
  };

  return (
    <div>
      Hotspots Properties Content
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <CTAButton
          variant="contained"
          endIcon={<ChevronRightIcon />}
          onClick={handleProceed}
          aria-label="Save, Review & Submit"
        >
          Save,Review & Submit
        </CTAButton>
      </Box>
    </div>
  );
}
