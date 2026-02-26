export type IEditorMode = "wireframe" | "preview" | "list";

export interface IComponentItem {
    component_id: number;
    component_name: string;
    width: number;
    height: number;
    url: string;
}

export interface IComponentGroup {
    component_type: string;
    components: IComponentItem[];
}

export interface ICategory {
    category_type: string;
    component_groups: IComponentGroup[];
}

export interface IComponentLibraryResponse {
    data: {
        mobile: ICategory[];
        web: ICategory[];
        desktop: ICategory[];
    }
}

export interface ISaveWireframeCanvasPayload {
    wireframeId: string;
    name: string;
    description: string | undefined;
    slots: ISaveWireframeSlot[];
}

export interface ISaveWireframeSlot {
    id: string | null;
    name: string;
    state?: string;
    components: ISaveWireframeComponent[];
}

export interface ISaveWireframeComponent {
    id: string | null;
    type: string;
    data?: {
        width?: number;
        height?: number;
    }
    banners?: unknown[];
    name?: string;
}