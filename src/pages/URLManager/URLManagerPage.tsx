import Loader from "@components/loader/Loader";
import SearchFilter from "@components/SearchFilter/SearchFilter";
import URLManagerList from "@components/URLmanager/URLManagerList/URLManagerList";
import type { UrlModalFormValues } from "@components/URLmanager/URLModal/URLModal.types";
import useURLManager from "@hooks/useURLManager";
import { CREATE_URL_PAGE } from "@utils/messages";
import * as React from "react";
import { Suspense } from "react";
const UrlModal = React.lazy(
  () => import("@components/URLmanager/URLModal/URLModal"),
);
import { usePrivilege } from "@hooks/usePrivilege";

const URLManagerPage = () => {
  const {
    isUrlModalOpen,
    setIsUrlModalOpen,
    editingRowData,
    setEditingRowData,
    filterData,
    data,
    isError,
    isLoading,
    page,
    setPage,
    size,
    onSearch,
    onPageSizeChange,
    onCreate,
    onEdit,
    isSaving,
    isFetching
  } = useURLManager();

  const { canCreateEditUrl } = usePrivilege();

  const constructDefaultValues = () : UrlModalFormValues | null => {
    if (!editingRowData) return null;
    const {
      id,
      platform,
      scheduleEnd,
      scheduleStart,
      slug,
      store,
      userCohorts,
      wireframeId,
      wireframeName,
    } = editingRowData;
    return {
      id,
      sourceWireframe: {
        wireframeId,
        wireframeName,
        slug,
        platform,
        store,
      },
      wireframeName,
      slug,
      platform,
      store,
      userCohorts : userCohorts?.map((c: {id: string, name: string})=>c.name) || [],
      isScheduled: !!(scheduleStart && scheduleEnd),
      scheduleStart: scheduleStart || null,
      scheduleEnd: scheduleEnd || null,
      wireframeId
    };
  };

  if (isLoading) {
    return <Loader open={true} />;
  }

  if (isError || !data) {
    return <div>Failed to load URLs</div>;
  }

  return (
    <>
      <SearchFilter
        filterData={filterData}
        onSearch={onSearch}
        createButtonText={CREATE_URL_PAGE}
        onCreateClick={() => setIsUrlModalOpen(true)}
        hideFilters={["status"]}
        showCreateBtn={canCreateEditUrl}
      />
      <URLManagerList
        data={data?.data ?? []}
        filterData={filterData}
        totalPages={data?.pagination?.totalPages ?? 0}
        page={page}
        pageSize={size}
        onPageChange={setPage}
        onPageSizeChange={(s: number | string) => onPageSizeChange(Number(s))}
        onEditRow={(row) => {
          setEditingRowData(row);
          setIsUrlModalOpen(true);
        }}
        isLoading={isFetching}
        showEditBtn={canCreateEditUrl}
      />

      <Suspense fallback={<Loader open={true} />}>
        {isUrlModalOpen && (
          <UrlModal
            open={isUrlModalOpen}
            onClose={() => {
              setIsUrlModalOpen(false)
              setEditingRowData(null);
            }}
            filterData={filterData}
            defaultValues={constructDefaultValues()}
            isEditing={!!editingRowData}
            onCreate={onCreate}
            onEdit={onEdit}
            isSaving={isSaving}
          />
        )}
      </Suspense>
    </>
  );
};

export default URLManagerPage;
