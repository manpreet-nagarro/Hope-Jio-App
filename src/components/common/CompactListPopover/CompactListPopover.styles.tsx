import { COLORS, FONTS, SIZES, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from "@constants/theme.constants"
import styled from "styled-components"

export const PrimaryText = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_DARK};
`
export const CountBadgeText = styled.span`
  font-size: ${SIZES.ICON_SIZE_MEDIUM};
  line-height: 1.5rem;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.ACCENT_PRIMARY};
  cursor: pointer;
  margin-left: ${SPACING.XS};
  display: inline-block;
`

export const PopoverListBox = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: ${SPACING.MD};
`

export const PopoverListItemText = styled.li`
  font-size: ${TYPOGRAPHY.VARIANT1.fontSize};
  padding: 0;
  margin: 0;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_DARK};
`

export const Container = styled.span`
  position: relative;
  display: inline-block;
`

export const HoverBox = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: max-content;
  overflow: hidden;
  background: ${COLORS.WHITE};
  padding: ${SPACING.SM};
  box-shadow: ${SHADOWS.HOVER};
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS.TINY};
  margin-top: ${SPACING.XS};
`

export const HoverBoxScroll = styled.div`
`

export const Wrapper = styled(Container)`
  &:hover ${HoverBox}, ${HoverBox}:hover, &:focus-within ${HoverBox} {
    display: block;
  }
`