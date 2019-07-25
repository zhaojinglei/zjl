import React, { Component } from "react";
import { RouterProps } from "react-router";

class Index extends Component<RouterProps> {
    render() {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#000"
                }}
            >
                下载链接有误
            </div>
        );
    }
}

export default Index;
