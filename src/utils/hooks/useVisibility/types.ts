import { EventSimple } from "../../commonTypes";

export interface IVisibility {
    isVisible: boolean;
    setVisible: EventSimple;
    setHidden: EventSimple;
    toggleVisibility: EventSimple;
};

export type UseVisibilityFunc = (initValue?: boolean) => IVisibility;