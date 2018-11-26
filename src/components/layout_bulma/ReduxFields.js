import React from "react";

export const renderInput = ({placeholder, label, type, content, input}) => {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input
                    {...input}
                    className="input"
                    type={type}
                    placeholder={placeholder}
                    value={content}
                />
            </div>
        </div>
    );
};

export const renderInputRequired = ({placeholder, label, type, content, input}) => {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input
                    {...input}
                    className="input"
                    type={type}
                    placeholder={placeholder}
                    value={content}
                    required
                />
            </div>
        </div>
    );
};

export const renderTextArea = ({placeholder, label, content, input}) => {
    console.log('renderField desc:', content);
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                    <textarea
                        {...input}
                        className="textarea"
                        placeholder={placeholder}
                        style={{resize: "none"}}
                        value={content}
                    />
            </div>
        </div>
    );
};

export const renderTextAreaRequired = ({placeholder, label, content, input}) => {
    console.log('renderField desc:', content);
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                    <textarea
                        {...input}
                        className="textarea"
                        placeholder={placeholder}
                        style={{resize: "none"}}
                        value={content}
                        required
                    />
            </div>
        </div>
    );
};