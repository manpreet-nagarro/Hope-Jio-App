import { lazy, Suspense, useState } from "react";
const CreateWireframeModal = lazy(() => import("@components/createPageModal/createPageModal"));
import WireframeEmptyState from "../../components/Wireframe/WireframeEmptyState/WireframeEmptyState";
import WireframeList from "../../components/Wireframe/WireframeList/WireframeList";
import Loader from "@components/loader/Loader";
import SearchFilter from "@components/SearchFilter/SearchFilter";
import useWireframes from "@hooks/useWireframes";
import { CREATE_WIREFRAME_PAGE } from "@utils/messages";
import { usePrivilege } from "@hooks/usePrivilege";
import { useDispatch } from "react-redux";
import { setSelectedWireframe, clearSelectedWireframe } from "@store/wireframeSlice/wireframeSlice";
import type { IWireframe } from "@interfaces/Wireframes";

const WireframesPage = () => {
  const {
    filterData,
    data,
    isError,
    isLoading,
    isFetching,
    page,
    setPage,
    size,
    hasUserSearched,
    handleOpenEditor,
    onSearch,
    onCreate,
    isSaving,
    isWireframePageCopyingStatus,
    archivingWireframeStatus,
    onArchiveWireframe,
    onPageSizeChange,
  } = useWireframes();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  /** usage of privilege check */
  const { canCreateWireframe } = usePrivilege();

  const dispatch = useDispatch();

  if (isLoading) {
    return <Loader open={true} />;
  }

  if (isError || !data) {
    return <div>Failed to load wireframes</div>;
  }

  if (!hasUserSearched && data.data.length === 0) {
    return (
      <WireframeEmptyState
        filterData={filterData}
        onCreate={onCreate}
        isSaving={isSaving}
        showCreateBtn={canCreateWireframe}
      />
    );
  }

  return (
    <>
      <SearchFilter
        filterData={filterData}
        onSearch={onSearch}
        createButtonText={CREATE_WIREFRAME_PAGE}
        onCreateClick={() => {
          setCreateModalOpen(true);
          dispatch(clearSelectedWireframe());
        }}
        showCreateBtn={canCreateWireframe}
      />
      <WireframeList
        data={data?.data ?? []}
        totalPages={data?.pagination?.totalPages ?? 0}
        page={page}
        pageSize={size}
        filterData={filterData}
        onPageChange={setPage}
        onPageSizeChange={(s: number | string) => onPageSizeChange(Number(s))}
        onDuplicate={(wireframeId) => {
          const selected = data?.data.find((w: IWireframe) => w.wireframeId === wireframeId);
          if (selected) {
            dispatch(setSelectedWireframe(selected));
          }
          setCreateModalOpen(true);
        }}
        onArchiveWireframe={onArchiveWireframe}
        onOpenEditor={handleOpenEditor}
        isLoading={isFetching}
        isWireframePageCopyingStatus={isWireframePageCopyingStatus}
        archivingWireframeStatus={archivingWireframeStatus}
      />

      <Suspense fallback={null}>
        <CreateWireframeModal
          open={createModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            dispatch(clearSelectedWireframe());
          }}
          filterData={filterData}
          onCreate={async (payload) => {
            try {
              await onCreate(payload);
              setCreateModalOpen(false);
              dispatch(clearSelectedWireframe());
            } catch (error) {
              console.error(error);
              }
          }}
          isSaving={isSaving}
        />
      </Suspense>
    </>
  );
};

export default WireframesPage;
