import DocumentStudio from "../../land/DocumentStudio";
import type { LandParcel,Language } from "../../types";
export const AIDocumentLab=({language}: {currentParcel:LandParcel;language:Language})=><DocumentStudio bn={language==="bn"} user={null} aiAvailable={false}/>;
