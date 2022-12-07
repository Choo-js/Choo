import esbuild from "esbuild";
import path from "path";

export const compileScript = async (script: string, basePath: string) => {
    const ext = script.split(".").pop()!;
    const newName = script.split("/").pop()!.replace(ext, "js");

    await esbuild.build({
        entryPoints: [script],
        bundle: false,
        platform: "browser",

        outfile: path.join(
            basePath,
            ".bundle",
            newName
        ),
    });
};
