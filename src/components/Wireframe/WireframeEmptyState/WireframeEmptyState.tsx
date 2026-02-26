import { Button } from "@mui/material";
import {
  Container,
  Title,
  Subtitle,
  ActionsRow,
} from "./WireframeEmptyState.styles";
import {
  CREATE_NEW_PAGE,
  NO_WIREFRAMES_YET_SUBTITLE,
  NO_WIREFRAMES_YET_TITLE,
} from "@utils/messages";
import { lazy, Suspense, useState } from "react";
const CreateWireframeModal = lazy(
  () => import("@components/createPageModal/createPageModal"),
);
import type { IPlatformInfo } from "src/interfaces/Wireframes";
import type { ICreateWireframePayload } from "src/interfaces/createPageModal";
import { EmptyWireframeIcon } from "@assets/icons-svg/createNewPage/EmptyWireframeIcon";
import { CreateNewPageIcon } from "@assets/icons-svg/createNewPage/CreateNewPageIcon";

type IProps = {
  filterData?: {
    store: string[];
    platform: IPlatformInfo[];
    status: string[];
    userCohorts: string[];
  };
  onCreate: (payload: ICreateWireframePayload) => void;
  isSaving: boolean;
  showCreateBtn?: boolean;
};

const WireframeEmptyState = ({ filterData, onCreate, isSaving, showCreateBtn }: IProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <Container>
        <div className="mb-6"><EmptyWireframeIcon /></div>

        <Title>{NO_WIREFRAMES_YET_TITLE}</Title>
        <Subtitle>{NO_WIREFRAMES_YET_SUBTITLE}</Subtitle>

        <ActionsRow>
          <Button onClick={() => setCreateModalOpen(true)} disabled={!showCreateBtn}>
            <CreateNewPageIcon />
            {CREATE_NEW_PAGE}
          </Button>
        </ActionsRow>
      </Container>

      <Suspense fallback={null}>
        <CreateWireframeModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          filterData={filterData}
          onCreate={(payload) => {
            onCreate(payload);
            setCreateModalOpen(false);
          }}
          isSaving={isSaving}
        />
      </Suspense>
    </>
  );
};

export default WireframeEmptyState;
