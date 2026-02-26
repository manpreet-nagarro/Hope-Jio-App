export interface IStore {
    id: string;
    name: string;
}

export interface ICreateWireframePayload {
    wireframeName?: string;
    slug?: string;
    store?: string;
    platformName?: string;
    createdby?: string;
    actionType: "NEW" | "COPY";
    sourceWireframeid: string;
}