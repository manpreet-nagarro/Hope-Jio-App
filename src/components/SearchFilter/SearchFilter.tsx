import { useRef, useState, useEffect, useCallback } from "react";
import { AlertSnackbar } from "@components/AlertSnackbar/AlertSnackbar";
import { useDebouncedCallback } from "@hooks/useDebouncedCallback";
import {
  FilterGroup,
  FiltersPanel,
  FlexWrapper,
  PlatformGroup,
  PlatformPill,
  SearchBox,
  SearchWrapper,
} from "./SearchFilter.styles";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import type { IPlatformInfo } from "src/interfaces/Wireframes";
import { Button } from "@mui/material";
import type { IProps } from "./SearchFilter.types";
import { CustomSelectField } from "@components/customSelectField/CustomSelectField";
import { DEBOUNCED_VALUE_DELAY, MAX_SEARCH_FILTER_INPUT_LENGTH } from "../../constants/commonConstants";
import { normalizeStatus } from "@utils/normalizeStatus";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { FONTS } from "@constants/theme.constants";
import * as WireframeListIcons from "@assets/icons-svg/wireframeList";
import { urlToPascalCaseKey } from "@utils/commonUtils";
import { UI_TEXTS } from "@constants/text.constants";

const getIconComponent = (iconPath: string): React.ComponentType<{ color?: string }> | null => {
  const key = urlToPascalCaseKey(iconPath);
  return (
    (WireframeListIcons as Record<string, React.ComponentType<{ color?: string }>>)[key] || null
  );
};

const SearchFilter = ({
  filterData,
  onSearch,
  onCreateClick,
  createButtonText,
  hideFilters,
  showCreateBtn,
}: IProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [store, setStore] = useState<string | undefined>();
  const [platform, setPlatform] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [userCohort, setUserCohort] = useState<string | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);
  const storeControlRef = useRef<HTMLDivElement | null>(null);
  const statusControlRef = useRef<HTMLDivElement | null>(null);
  const userCohortControlRef = useRef<HTMLDivElement | null>(null);

  const hasAnyFilter =
    Boolean(store) ||
    Boolean(platform) ||
    Boolean(status) ||
    Boolean(userCohort);

  const handleClearAll = () => {
    setStore(undefined);
    setPlatform(undefined);
    setStatus(undefined);
    setUserCohort(undefined);

    onSearch({
      searchText,
      store: undefined,
      platform: undefined,
      status: undefined,
      userCohorts: undefined,
    });
  };

  const handleSearch = useCallback(() => {
    onSearch({ searchText, store, platform, status, userCohorts: userCohort });
  }, [onSearch, searchText, store, platform, status, userCohort]);

  const [debouncedHandleSearch, cancelDebounced] = useDebouncedCallback(
    handleSearch,
    DEBOUNCED_VALUE_DELAY,
  );

  useEffect(() => {
    debouncedHandleSearch();
    return () => cancelDebounced();
  }, [searchText, debouncedHandleSearch, cancelDebounced]);

  const searchRef = useRef(searchText);
  useEffect(() => {
    searchRef.current = searchText;
  }, [searchText]);

  useEffect(() => {
    onSearch({
      searchText: searchRef.current,
      store,
      platform,
      status,
      userCohorts: userCohort,
    });
  }, [store, platform, status, userCohort, onSearch]);

  const localizeNormalizeStatus = (status: string) =>
    status?.toUpperCase().replaceAll(/[-\s]+/g, "_").replaceAll(/PG._/g, "") || status;

  return (
    <>
      <SearchWrapper>
        <SearchBox>
          <SearchIcon />
          <input
            ref={inputRef}
            placeholder="Search by page name, slug or ID"
            value={searchText}
            onBeforeInput={(e) => {
              const inputType = (e as React.FormEvent<HTMLInputElement> & { nativeEvent: InputEvent }).nativeEvent.inputType;
              if (
                searchText.length >= MAX_SEARCH_FILTER_INPUT_LENGTH &&
                e.data && inputType?.startsWith('insert')
              ) {
                e.preventDefault();
                setAlertMessage(
                  UI_TEXTS?.MESSAGES?.CANNOT_ENTER_MORE_THAN_MAX_CHARACTERS 
                );
              }
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= MAX_SEARCH_FILTER_INPUT_LENGTH) {
                setSearchText(value);
              } else {
                setSearchText(value.slice(0, MAX_SEARCH_FILTER_INPUT_LENGTH));
                setAlertMessage(
                  UI_TEXTS?.MESSAGES?.CANNOT_ENTER_MORE_THAN_MAX_CHARACTERS
                );
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData('text');
              if (paste.length + searchText.length > MAX_SEARCH_FILTER_INPUT_LENGTH) {
                e.preventDefault();
                const allowed = MAX_SEARCH_FILTER_INPUT_LENGTH - searchText.length;
                if (allowed > 0) {
                  setSearchText(searchText + paste.slice(0, allowed));
                }
                setAlertMessage(
                  UI_TEXTS?.MESSAGES?.CANNOT_ENTER_MORE_THAN_MAX_CHARACTERS
                );
              }
            }}
          />
          <AlertSnackbar
            open={!!alertMessage}
            message={alertMessage || ""}
            severity="warning"
            onClose={() => setAlertMessage(null)}
          />
          {searchText.length > 0 && (
            <button
              type="button"
              className="clear-search-btn"
              data-testid="clear-search-btn"
              onClick={() => {
                setSearchText("");
                inputRef.current?.focus();
              }}
            >
              <CloseIcon fontSize="small" />
            </button>
          )}
        </SearchBox>

        <FlexWrapper>
          <Button
            id="create-cta-button"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateClick}
            sx={{ fontFamily: FONTS.FONT_FAMILY_BOLD }}
            disabled={!showCreateBtn}
          >
            {createButtonText}
          </Button>
          <Button
            id="filter-button"
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters((p) => !p)}
            endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            className={showFilters ? "active" : ""}
            sx={{ fontFamily: FONTS.FONT_FAMILY_BOLD }}
          >
            Filters
          </Button>
        </FlexWrapper>
      </SearchWrapper>

      {/* FILTER PANEL */}
      {showFilters && (
        <FiltersPanel>
          {hideFilters?.includes("stores") ? null : <FilterGroup>
            <CustomSelectField
              controlRef={storeControlRef}
              selected={Boolean(store)}
              ariaLabel="Store"
              value={store}
              onChangeValue={(v) => setStore(v || undefined)}
              options={filterData?.store ?? []}
              emptyLabel="Stores"
              showDefaultOption={false}
            />
          </FilterGroup>}

          {hideFilters?.includes("platform") ? null :<PlatformGroup>
            <span className="platform-label">Platform:</span>
            <div className="platform-pills-container">
              {filterData?.platform.map((p: IPlatformInfo) => {
                const Icon = p?.iconPath ? getIconComponent(p.iconPath) : null;
                return (
                  <PlatformPill
                    key={p.name}
                    active={platform === p.name ? true : undefined}
                    onClick={() =>
                      setPlatform(platform === p.name ? "" : p.name)
                    }
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        marginBottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {Icon ? <Icon color={platform === p.name ? "#000093" : "initial"} /> : null}
                    </div>
                    <span className="platform-name">{p.name}</span>
                  </PlatformPill>
                );
              })}
            </div>
          </PlatformGroup>}

          {hideFilters?.includes("status") ? null : <FilterGroup>
            <CustomSelectField
              controlRef={statusControlRef}
              selected={Boolean(status)}
              ariaLabel="Status"
              value={status}
              onChangeValue={(v) =>
                setStatus(localizeNormalizeStatus(v) || undefined)
              }
              options={filterData?.status ?? []}
              emptyLabel="All"
              normalizeOption={(s) => localizeNormalizeStatus(s)}
              renderNormalizeText={(s) => normalizeStatus(s)}
            />
          </FilterGroup>}

          {hideFilters?.includes("cohorts") ? null :<FilterGroup>
            <CustomSelectField
              controlRef={userCohortControlRef}
              selected={Boolean(userCohort)}
              ariaLabel="User Cohort"
              value={userCohort}
              onChangeValue={(v) => setUserCohort(v || undefined)}
              options={filterData?.userCohorts ?? []}
              emptyLabel="User Cohort"
              showDefaultOption={false}
            />
          </FilterGroup>}

          {hasAnyFilter && (
            <Button
              id="clear-filters-button"
              variant="text"
              endIcon={<CloseIcon />}
              onClick={handleClearAll}
              disabled={!hasAnyFilter}
              sx={{ fontFamily: FONTS.FONT_FAMILY_BOLD }}
              disableFocusRipple
              disableTouchRipple
              disableRipple
            >
              Clear all
            </Button>
          )}
        </FiltersPanel>
      )}
    </>
  );
};

export default SearchFilter;
