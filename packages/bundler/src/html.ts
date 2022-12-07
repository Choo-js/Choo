import fs from "fs";
import crypto from "crypto";
import { parse } from "node-html-parser";

export const setupScriptRefresh = (htmlPath: string) => {
    const html = parse(fs.readFileSync(htmlPath).toString());
    const scripts = html.getElementsByTagName("script");

    for (const sc of scripts) {
        sc.setAttribute(
            "src",
            sc.getAttribute("src") +
                "?" +
                crypto.randomBytes(16).toString("base64")
        );
    }

    return html.toString();
};
