import { FONTS, COLORS, SPACING, SIZES, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from "@constants/theme.constants"
import styled from "styled-components"

export const Container = styled.div`
  position: relative;
  display: inline-block;
  font-size: ${SIZES.ICON_SIZE_MEDIUM};
`

export const Trigger = styled.span`
  color: ${COLORS.LINK};
  cursor: pointer;
  font-size: ${SIZES.ICON_SIZE_MEDIUM};
  font-family: ${FONTS.FONT_FAMILY};
`

export const HoverBox = styled.div`
  display: none;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${/* use a large z-index from theme if available */ 1000};
  max-width: ${SIZES.URL_HOVER_MAX_WIDTH};
  background: ${COLORS.WHITE};
  padding: ${SPACING.SM} ${SPACING.SM};
  box-shadow: ${SHADOWS.HOVER};
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS.TINY};
  margin-top: ${SPACING.XS};
`

export const HoverBoxScrollWrapper = styled.div`
  max-height: ${SIZES.URL_HOVER_MAX_HEIGHT};
  overflow: auto;
  padding-right: ${SPACING.SM};
`

export const UrlItem = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  margin-bottom: ${SPACING.XS};

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${COLORS.TEXT_DARK};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    max-width: 100%;
    overflow: hidden;
    font-size: ${TYPOGRAPHY.VARIANT1.fontSize};
    text-transform: lowercase;
    font-family: ${FONTS.FONT_FAMILY_LIGHT};
  }

  a:hover {
    text-decoration: none;
    color: ${COLORS.LINK};
    font-family: ${FONTS.FONT_FAMILY};
  }

  .url-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    width: ${SIZES.BUTTON_SIZE_SMALL};
    height: ${SIZES.BUTTON_SIZE_SMALL};
    transform: rotate(45deg);
    flex: 0 0 ${SIZES.BUTTON_SIZE_SMALL};
  }
`

export const Wrapper = styled(Container)`
  &:hover ${HoverBox}, ${HoverBox}:hover, &:focus-within ${HoverBox} {
    display: block;
  }
`