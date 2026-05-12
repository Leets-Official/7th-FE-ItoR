declare module "*.svg" {
    import * as React from "react";

    // ReactComponent로 불러오는 경우
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
}