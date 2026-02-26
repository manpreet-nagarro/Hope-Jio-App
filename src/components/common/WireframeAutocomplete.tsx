import { useCallback, useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useDebounce } from "@hooks/useDebounce";
import { fetchWireframes } from "@api/wireframe.api";

const PAGE_SIZE = 5;

export interface WireframeOption {
  wireframeId: string;
  wireframeName: string;
  status?: string;
  slug: string;
  platform?: string;
  store?: string;
}

interface WireframeAutocompleteProps {
  value: WireframeOption | null;
  onChange: (value: WireframeOption | null) => void;
  platformName?: string;
  store?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  setExtraFields?: (wf: WireframeOption | null) => void;
}

export const WireframeAutocomplete = ({
  value,
  onChange,
  platformName,
  store,
  error,
  disabled = false,
  setExtraFields,
}: WireframeAutocompleteProps) => {
  const [options, setOptions] = useState<WireframeOption[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const search = useDebounce(input, 300);

  const copySelectKey = useMemo(
    () => `${platformName || "none"}-${store || "none"}`,
    [platformName, store]
  );

  const loadFirstPage = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWireframes(0, PAGE_SIZE, {
        searchText: search,
      });
      setOptions(res.data);
      setHasMore(!res?.pagination?.last);
      setPage(1);
    } finally {
      setLoading(false);
    }
  }, [search]);

  const loadNextPage = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetchWireframes(page, PAGE_SIZE, {
        searchText: search,
      });
      setOptions((prev) => [...prev, ...res.data]);
      setHasMore(!res.pagination.last);
      setPage((p) => p + 1);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, search]);

  const formatStatus = (status?: string) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  useEffect(() => {
    setOptions([]);
    setPage(1);
    setHasMore(true);
    loadFirstPage();
  }, [search, loadFirstPage]);

  // Ensure selected value is always in options and avoid duplicates
  let mergedOptions = options;
  if (value?.wireframeId) {
    mergedOptions = [value, ...options.filter(opt => opt.wireframeId !== value.wireframeId)];
  }

  return (
      <Autocomplete
        options={mergedOptions}
        loading={loading}
        key={copySelectKey}
        value={value ?? null}
        filterOptions={(x) => x}
        getOptionLabel={(option: WireframeOption) => {
          if (!option) return "";
          const name = option.wireframeName || "";
          const status = option.status ? `(${formatStatus(option.status)})` : "";
          return `${name}${status}`;
        }}
        onInputChange={(_, val, reason) => {
          if (reason === "input" || reason === "clear") {
            setInput(val);
            setLoading(false);
          }
        }}
        onChange={(_, val) => {
          onChange(val || null);
          setLoading(false);
          if (setExtraFields) setExtraFields(val || null);
        }}
        isOptionEqualToValue={(option, val) => option?.wireframeId === val?.wireframeId}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 170,
              overflow: "auto",
            },
            onScroll: (e: React.UIEvent<HTMLUListElement>) => {
              const listbox = e.currentTarget;
              if (
                listbox.scrollTop + listbox.clientHeight >=
                listbox.scrollHeight - 10
              ) {
                loadNextPage();
              }
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            error={!!error}
            helperText={error}
            disabled={disabled}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && !value && <CircularProgress size={16} />}
                    {params.InputProps?.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
        noOptionsText={loading ? "Searching ..." : "No record Found"}
      />
  );
};
