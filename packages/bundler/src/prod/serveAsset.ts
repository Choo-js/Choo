import fs from "fs";
import path from "path";
import { compileScript } from "./js";
import mime from "mime-types";

export interface AssetServeResult {
    code: number;
    path: string;
    mime: string | false;
    content?: string;
}

export const serveAsset = async (assetPath: string, basePath: string): Promise<AssetServeResult> => {
    if (assetPath.endsWith(".ts")) {
        const orig = path.join(basePath, "tests", assetPath);
        const ext = assetPath.split(".").pop()!;
        const newName = assetPath.split("/").pop()!.replace(ext, "js");
        const newPath = path.join(basePath, ".bundle", newName);

        if (!fs.existsSync(orig))
            return {
                code: 404,
                mime: mime.lookup(orig),
                path: orig,
            };

        await compileScript(orig, basePath);

        if (!fs.existsSync(newPath))
            return {
                code: 404,
                mime: mime.lookup(newPath),
                path: newPath,
            };

        return {
            code: 200,
            mime: mime.lookup(newPath),
            path: newPath,
        };
    } else {
        const file = path.join(
            basePath,
            "tests",
            assetPath.endsWith("/") ? assetPath + "index.html" : assetPath
        );

        if (
            (assetPath.endsWith(".html") || assetPath.endsWith("/")) &&
            fs.existsSync(file)
        ) {
            return {
                code: 200,
                mime: "text/html",
                path: file,
            };
        } else {
            if (fs.existsSync(file))
                return {
                    code: 200,
                    mime: mime.lookup(file),
                    path: file,
                };

            else return {
                code: 400,
                mime: mime.lookup(file),
                path: file,
            };
        }
    }
};

export const getAssetContents = async (assetPath: string, override?: string) => {
    return override || fs.readFileSync(assetPath).toString();
};
