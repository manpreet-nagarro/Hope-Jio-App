import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ICategory, IComponentGroup, IComponentItem } from "src/interfaces/wireframeEditor";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { fetchComponentLibrary } from "@api/componentLibrary.api";
import { setDragStartFromSidebar } from "@store/slotsSlice/slotsSlice";

const getModifiedComponentNames = (categories : ICategory[]) => {
  const names = new Set<string>();
  (categories || []).forEach((cat) =>
      (cat.component_groups || []).forEach((g) =>
        (g.components || []).forEach((c) => names.add(c.component_name || "")),
      ),
    );
    return names;
}

export const useComponentLibrary = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["component-library"],
    queryFn: fetchComponentLibrary,
  });

  const activePlatform = useSelector(
      (state: RootState) => state.wireframe.selectedWireframe?.platform,
    );

  const categories: ICategory[] = (() => {
      if (!data?.data) return [];
  
      if(activePlatform?.toLowerCase() === "mobile") {
        return data.data.mobile;
      }
      if(activePlatform?.toLowerCase() === "web") {
        return data.data.web;
      }
      if(activePlatform?.toLowerCase() === "desktop") {
        return data.data.desktop;
      }
      return [];
    })();

  const [searchTerm, setSearchTerm] = useState("");

  const componentOptions = useMemo(() => {
    const names = getModifiedComponentNames(categories);
    return Array.from(names).filter(Boolean);
  }, [categories]);

  // Helper to filter components in a group
  const filterGroupComponents = useMemo(() => (group: IComponentGroup, q: string) => ({
    ...group,
    components: (group.components || []).filter((c: IComponentItem) =>
      (c.component_name || "").toLowerCase().includes(q),
    ),
  }), []);

  // Helper to filter groups in a category
  const filterCategoryGroups = useMemo(() => (category: ICategory, q: string) => ({
    ...category,
    component_groups: (category.component_groups || [])
      .map((group: IComponentGroup) => filterGroupComponents(group, q))
      .filter((g: IComponentGroup) => (g.components || []).length > 0),
  }), [filterGroupComponents]);

  const filteredCategories = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((category) => filterCategoryGroups(category, q))
      .filter((cat) => (cat.component_groups || []).length > 0);
  }, [categories, searchTerm, filterCategoryGroups]);

  const onDragStart = (e: React.DragEvent, type: string, component: unknown) => {
    e.dataTransfer.setData("component", type);
    e.dataTransfer.setData(`component-${type}`, type);
    e.dataTransfer.setData(`component-data`, JSON.stringify(component));
    dispatch(setDragStartFromSidebar(true));
  };

  return {
    data,
    categories,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    componentOptions,
    filteredCategories,
    onDragStart,
  };
};

export default useComponentLibrary;
