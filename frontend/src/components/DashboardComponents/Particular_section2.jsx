import React from "react";
import { MediaUploadSection } from "./MediaUploadSection";

export default function Particular_section2({ onChange }) {
    return (
        <div className="particular_section2">
            <h1>Photos & videos</h1>
            <MediaUploadSection onChange={onChange} />
        </div>
    );
}

