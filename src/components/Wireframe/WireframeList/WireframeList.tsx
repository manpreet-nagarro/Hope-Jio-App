import { useMemo, lazy, Suspense } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  MenuItem,
  Button,
  Select,
  Table,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import WireframeOverlay from "../WireframeOverlay/WireframeOverlay";
import {
  PageContainer,
  Footer,
  StatusChip,
  PlatformCell,
  PageNameCell,
  PageMeta,
  PaginationActions,
  RowsPerPage,
  PageInfo,
  StyledTableHead,
  TableContainerStyled,
  RowsSpan,
  HeaderCell,
  StyledTableCell,
  UrlTableCell,
  PageTitleWrapper,
  PageTitleText,
  PageTitleArrow,
  TextCell,
} from "./WireframeList.styles";
import { STATUS_COLOR_MAP } from "../../../utils/statusColor";
import type { IPlatformInfo, IWireframe } from "../../../interfaces/Wireframes";
import { normalizeStatus } from "@utils/normalizeStatus";
import { openPageConfigDrawer } from "@store/wireframeSlice/wireframeSlice";
import WireframeActionsMenu from "../WireframeActionMenu/WireframeActionMenu";
const PageConfigurationDrawer = lazy(() =>
  import("../PageConfigurationOverlay").then((m) => ({
    default: m.PageConfigurationDrawer,
  })),
);
import RightIcon from "@assets/icons-svg/rightIcon";
import CompactListPopover from "@components/common/CompactListPopover/CompactListPopover";
import Loader from "@components/loader/Loader";
import { FONTS } from "@constants/theme.constants";
import { UrlMappedCell } from "@components/common/UrlMappedCell/UrlMappedCell";
import * as WireframeListIcons from "@assets/icons-svg/wireframeList";
import { urlToPascalCaseKey } from "@utils/commonUtils";
import type { CompactListPopoverItem } from "@components/common/CompactListPopover/CompactListPopover.types";
import { getModifiedCohorts } from "./wireframeList.utils";

const getIconComponent = (iconPath: string): React.ComponentType<{ color?: string }> | null => {
  const key = urlToPascalCaseKey(iconPath);
  return (
    (WireframeListIcons as Record<string, React.ComponentType<{ color?: string }>>)[key] || null
  );
};

type Iprops = {
  data: IWireframe[];
  totalPages: number;
  page: number;
  pageSize: number;
  filterData?: {
    store: string[];
    platform: IPlatformInfo[];
    status: string[];
    userCohorts: string[];
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDuplicate: (wireframeId: string, wireframeName?: string) => void;
  isLoading?: boolean;
  onOpenEditor: (wireframeId: string, wireframe: IWireframe) => void;
  isWireframePageCopyingStatus?: string;
  onArchiveWireframe: (wireframeId: string) => void;
  archivingWireframeStatus?: string;
};

const WireframeListingPage = ({
  data,
  totalPages,
  page,
  pageSize,
  filterData,
  onPageChange,
  onPageSizeChange,
  onOpenEditor,
  isLoading,
  onDuplicate,
  isWireframePageCopyingStatus,
  onArchiveWireframe,
  archivingWireframeStatus,
}: Iprops) => {
  const dispatch = useDispatch();

  const platformIconMap = useMemo(() => {
    const map = new Map<string, string>();

    filterData?.platform.forEach((p) => {
      // normalize key to avoid case issues
      map.set(p.name.toLowerCase(), p.iconPath);
    });

    return map;
  }, [filterData]);

  const normalizePlatformKey = (platform: unknown): string | null => {
    if (typeof platform === "string" && platform.trim().length > 0) {
      return platform.toLowerCase();
    }
    return null;
  };

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
                  width: "30%",
                  paddingLeft: "1rem",
                }}
              >
                Page Name
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 100, maxWidth: 160, width: "13%" }}>
                Store
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 100, maxWidth: 160, width: "15%" }}>
                Platform
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 120, maxWidth: 200, width: "13%" }}>
                User Cohort
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 90, maxWidth: 120, width: "12%" }}>
                Status
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 150, maxWidth: 250, width: "11%" }}>
                URLs Mapped
              </HeaderCell>
              <HeaderCell sx={{ minWidth: 100, maxWidth: 140, width: "6%" }}>
                Actions
              </HeaderCell>
            </TableRow>
          </StyledTableHead>

          <TableBody sx={{ position: "relative" }}>
            {isLoading && <Loader open={isLoading} variant="inline" />}
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No wireframes found.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data.map((row) => {
                  const normalizedStatus = normalizeStatus(row.status);
                  const statusColors = STATUS_COLOR_MAP[normalizedStatus];
                  const platformKey = normalizePlatformKey(row.platform);
                  const iconPath = platformKey
                    ? platformIconMap.get(platformKey)
                    : undefined;
                  const Icon = iconPath ? getIconComponent(iconPath) : null;
                  const wireframeName = row.wireframeName?.toLowerCase();
                  const cohorts : { id: string; name: string }[] | string[] = getModifiedCohorts(row) || [];
                  return (
                    <TableRow key={row.wireframeId} hover>
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
                          <PageTitleWrapper
                            role="button"
                            tabIndex={0}
                            onClick={() => onOpenEditor(row.wireframeId, row)}
                          >
                            <PageTitleText
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                cursor: "pointer",
                                textTransform: "capitalize",
                              }}
                              title={
                                wireframeName.length > 60
                                  ? wireframeName
                                  : undefined
                              }
                            >
                              {wireframeName}
                            </PageTitleText>
                            <PageTitleArrow className="page-title-arrow">
                              <RightIcon size={16} />
                            </PageTitleArrow>
                          </PageTitleWrapper>
                          <PageMeta>
                            {row.slug} • {row.wireframeId}
                          </PageMeta>
                        </PageNameCell>
                      </TableCell>

                      <StyledTableCell
                        sx={{
                          minWidth: 100,
                          maxWidth: 160,
                          width: "13%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
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
                        }}
                      >
                        <CompactListPopover
                          items={cohorts as CompactListPopoverItem[]}
                        />
                      </StyledTableCell>
                      <TableCell
                        sx={{
                          minWidth: 90,
                          maxWidth: 120,
                          width: "10%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          paddingLeft: "0px",
                        }}
                      >
                        <StatusChip
                          $bg={statusColors.bg}
                          $color={statusColors.text}
                        >
                          {normalizedStatus}
                        </StatusChip>
                      </TableCell>

                      <UrlTableCell
                        sx={{
                          minWidth: 150,
                          maxWidth: 250,
                          width: "17%",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          paddingLeft: "0px",
                        }}
                      >
                        <UrlMappedCell urls={row.urlsMapped} />
                      </UrlTableCell>
                      <TableCell
                        sx={{
                          minWidth: 100,
                          maxWidth: 140,
                          width: "10%",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <WireframeActionsMenu
                          wireframeId={row.wireframeId}
                          wireframe={row}
                          onOpenEditor={onOpenEditor}
                          onConfigure={() =>
                            dispatch(openPageConfigDrawer(row))
                          }
                          onDuplicate={() => onDuplicate(row.wireframeId)}
                          isWireframePageCopyingStatus={
                            isWireframePageCopyingStatus
                          }
                          onArchiveWireframe={onArchiveWireframe}
                          archivingWireframeStatus={archivingWireframeStatus}
                        />
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

      <WireframeOverlay />
      <Suspense fallback={null}>
        <PageConfigurationDrawer />
      </Suspense>
    </PageContainer>
  );
};

export default WireframeListingPage;
