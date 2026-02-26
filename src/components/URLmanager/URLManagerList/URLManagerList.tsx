import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  Select,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import {
  PageContainer,
  PlatformCell,
  PageNameCell,
  PageMeta,
  StyledTableHead,
  TableContainerStyled,
  HeaderCell,
  StyledTableCell,
  PageTitleWrapper,
  PageTitleText,
  TextCell,
  Footer,
  RowsPerPage,
  RowsSpan,
  PageInfo,
  PaginationActions,
  ScheduleDiv,
  StyledScheduled,
  StyledDate,
  StyledExpired,
  StyledSlugTableCell,
} from "./URLManagerList.styles";
import Loader from "@components/loader/Loader";
import type { IPlatformInfo } from "src/interfaces/Wireframes";
import CompactListPopover from "@components/common/CompactListPopover/CompactListPopover";
import EditIcon from "@mui/icons-material/Edit";
import type { IUrlManager } from "src/interfaces/URLManager";
import { useMemo } from "react";
import { COLORS, FONTS } from "@constants/theme.constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatScheduleRange, getScheduleStatus } from "@utils/scheduleUtils";
import { IconButtonNoPadding } from "@components/slotEditorCanvas/slotEditorCanvas.styles";
import * as WireframeListIcons from "@assets/icons-svg/wireframeList";
import { urlToPascalCaseKey } from "@utils/commonUtils";
import { getModfiedCohorts } from "./urlManagerList.utils";
import type { CompactListPopoverItem } from "@components/common/CompactListPopover/CompactListPopover.types";

const getIconComponent = (iconPath: string): React.ComponentType<{ color?: string }> | null => {
  const key = urlToPascalCaseKey(iconPath);
  return (
    (WireframeListIcons as Record<string, React.ComponentType<{ color?: string }>>)[key] || null
  );
};

interface URLManagerListProps {
  data: IUrlManager[];
  filterData?: {
    store: string[];
    platform: IPlatformInfo[];
    status: string[];
    userCohorts: string[];
  };
  isLoading?: boolean;
  totalPages: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEditRow?: (row: IUrlManager) => void;
  showEditBtn?: boolean;
}

const URLManagerList = ({
  data,
  filterData,
  isLoading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalPages,
  onEditRow,
  showEditBtn,
}: URLManagerListProps) => {
  const normalizePlatformKey = (platform: unknown): string | null => {
    if (typeof platform === "string" && platform.trim().length > 0) {
      return platform.toLowerCase();
    }
    return null;
  };

  const platformIconMap = useMemo(() => {
    const map = new Map<string, string>();

    filterData?.platform.forEach((p) => {
      // normalize key to avoid case issues
      map.set(p.name.toLowerCase(), p.iconPath);
    });

    return map;
  }, [filterData]);

  return (
    <PageContainer>
      <TableContainerStyled>
        <Table
          sx={{
            tableLayout: "fixed",
            width: "100%",
            minWidth: 900,
          }}
        >
          <StyledTableHead>
            <TableRow>
              <HeaderCell
                sx={{
                  minWidth: 180,
                  maxWidth: 320,
                  width: "22%",
                  paddingLeft: "1rem",
                }}
              >
                Page Name
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 160, maxWidth: 300, width: "20%" }}>
                URL Slug
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 100, maxWidth: 160, width: "13%" }}>
                Store
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 100, maxWidth: 160, width: "13%" }}>
                Platform
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 120, maxWidth: 200, width: "12%" }}>
                User Cohort
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 120, maxWidth: 200, width: "17%" }}>
                Schedule
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 80, maxWidth: 120, width: "5%" }}>
                Edit
              </HeaderCell>
            </TableRow>
          </StyledTableHead>

          <TableBody sx={{ position: "relative" }}>
            {isLoading && <Loader open={isLoading} variant="inline" />}
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No URLs found.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data.map((row) => {
                  const platformKey = normalizePlatformKey(row.platform);
                  const iconPath = platformKey
                    ? platformIconMap.get(platformKey)
                    : undefined;
                  const schedule = {
                    scheduleStart: row.scheduleStart,
                    scheduleEnd: row.scheduleEnd,
                  };
                  const scheduleStatus = getScheduleStatus(schedule);
                  const Icon = iconPath ? getIconComponent(iconPath) : null;
                  const cohorts : CompactListPopoverItem[]= getModfiedCohorts(row)
                  return (
                    <TableRow key={row.id} hover>
                      <TableCell
                        sx={{
                          minWidth: 180,
                          maxWidth: 320,
                          width: "22%",
                          padding: "8px 12px",
                          verticalAlign: "top", 
                        }}
                      >
                        <PageNameCell>
                          <PageTitleWrapper>
                            <Tooltip
                              title={row.wireframeName.length > 60 ? row.wireframeName : ""}
                              placement="top"
                              arrow
                            >
                              <span>
                                <PageTitleText
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {row.wireframeName}
                                </PageTitleText>
                              </span>
                            </Tooltip>
                          </PageTitleWrapper>
                          <PageMeta>{row.wireframeId}</PageMeta>
                        </PageNameCell>
                      </TableCell>
                      <StyledSlugTableCell
                        sx={{
                          minWidth: 160,
                          maxWidth: 300,
                          width: "20%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          padding: 0,
                        }}
                      >
                        <Tooltip
                          title={row.slug.length > 60 ? row.slug : ""}
                          placement="top"
                          arrow
                        >
                          <a
                            className="styled__link"
                            href={row.slug}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              maxWidth: 300,
                              paddingRight: "0.5rem"
                            }}
                          >
                            {row.slug}
                          </a>
                        </Tooltip>
                      </StyledSlugTableCell>
                      <StyledTableCell
                        sx={{
                          minWidth: 100,
                          maxWidth: 160,
                          width: "13%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          paddingLeft: "0px",
                        }}
                      >
                        {row.store}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          minWidth: 100,
                          maxWidth: 160,
                          width: "13%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          padding: "8px 0px !important",
                        }}
                      >
                        <PlatformCell>
                          {Icon && <Icon color="#9EB5FA" />}
                          <TextCell>{row.platform}</TextCell>
                        </PlatformCell>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          minWidth: 120,
                          maxWidth: 200,
                          width: "15%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          paddingLeft: "0px",
                        }}
                      >
                        {row?.userCohorts && row?.userCohorts?.length > 0 ? (
                          <CompactListPopover
                            items={cohorts}
                          />
                        ) : (
                          "-"
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          minWidth: 120,
                          maxWidth: 200,
                          width: "12%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          paddingLeft: "0px",
                        }}
                      >
                        {!scheduleStatus && "-"}
                        {scheduleStatus === "Scheduled" && (
                          <ScheduleDiv>
                            <StyledScheduled>Scheduled</StyledScheduled>
                            <StyledDate>
                              {formatScheduleRange(
                                row.scheduleStart,
                                row.scheduleEnd,
                              )}
                            </StyledDate>
                          </ScheduleDiv>
                        )}
                        {scheduleStatus === "Expired" && (
                          <ScheduleDiv>
                            <StyledExpired>Scheduled Expired</StyledExpired>
                            <StyledDate>
                              {formatScheduleRange(
                                row.scheduleStart,
                                row.scheduleEnd,
                              )}
                            </StyledDate>
                          </ScheduleDiv>
                        )}
                      </StyledTableCell>
                      <TableCell
                        sx={{
                          minWidth: 80,
                          maxWidth: 120,
                          width: "5%",
                          paddingLeft: "0px",
                        }}
                      >
                        <IconButtonNoPadding
                          onClick={(e : React.MouseEvent) => {
                            e.stopPropagation();
                            if (typeof onEditRow === "function") onEditRow(row);
                          }}
                          disabled={!showEditBtn}
                        >
                          <EditIcon
                            sx={{
                              height: "16px",
                              width: "16px",
                              color: showEditBtn ? COLORS.TEXT_DARK : COLORS.TEXT_MUTED,
                            }}
                          />
                        </IconButtonNoPadding>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainerStyled>

      <Footer>
        <RowsPerPage>
          <RowsSpan>Rows per page:</RowsSpan>
          <Select
            className="pagination"
            size="small"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </RowsPerPage>

        <PageInfo>
          Page {page} of {totalPages}
        </PageInfo>

        <PaginationActions>
          <Button
            variant="text"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            startIcon={<ChevronLeftIcon />}
            sx={{ fontFamily: FONTS.FONT_FAMILY_BOLD, fontSize: "1rem" }}
          >
            Previous
          </Button>

          <Button
            variant="outlined"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => onPageChange(page + 1)}
            endIcon={<ChevronRightIcon />}
            sx={{ fontFamily: FONTS.FONT_FAMILY_BOLD, fontSize: "1rem" }}
          >
            Next
          </Button>
        </PaginationActions>
      </Footer>
    </PageContainer>
  );
};

export default URLManagerList;
