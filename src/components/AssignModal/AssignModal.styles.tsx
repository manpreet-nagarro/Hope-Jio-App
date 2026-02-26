import { COLORS, FONTS } from "@constants/theme.constants";
import styled from "styled-components";

export const StyledHeaderWrapper = styled.div`
    display: grid;
    margin-bottom: 1rem;
`

export const StyledDialogTitleHeader = styled.p`
    font-family : ${FONTS.FONT_FAMILY_BOLD};
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: center;
    color: ${COLORS.TEXT_BLACK}
`

export const StyledDialogSubtitleTitleText = styled.p`
    font-family : ${FONTS.FONT_FAMILY_LIGHT};
    font-size: 1;
    line-height: 1.5rem;
    text-align: center;
    color: ${COLORS.TEXT_BLACK};
    margin-top: 0.5rem;
`