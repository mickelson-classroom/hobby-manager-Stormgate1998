import React, { FC, useEffect, useState } from "react";

export const GenericInput: FC<{ valid_feedback: string, invalid_feeback: string, label: string, isValid: boolean, onChange: (i: string) => void }> = ({
    onChange, valid_feedback, invalid_feeback, label, isValid
}) => {
    const [titleInput, setTitleUserInput] = useState("");
    useEffect(() => {
        onChange(titleInput);
    }, [titleInput]);

    return (
        <>
            <label className="form-label">{label}</label>
            <input className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}

                value={titleInput}
                onChange={(e) => {
                    setTitleUserInput(e.target.value);
                }}
            />
            <div className="invalid-feedback">{invalid_feeback}</div>
            <div className="valid-feedback">{valid_feedback}</div>
        </>
    );
};
