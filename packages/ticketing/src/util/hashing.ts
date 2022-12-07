import crypto from "crypto";

export const SALT = "ZevTxh9tyswiHF9ptUQgOPa2Ik447xEwPnsU2BT4DKTfo4iB0PBstPkaC1azGLoownI4UY3tb3JtA1JqeleO9VJov5Vvq/b0qrIPOBJXkXqPrsYXkLNlLtbvQ0sV1Lk3Gt91nE7HviG1j1Pqfn3b7ouBFUrkmVSdVZ9NY1QU/Uc=";

export const hashPassword = (password: string) => {
    const derived = crypto.pbkdf2Sync(password, SALT, 10000, 64, "sha512");
    
    return derived.toString("hex");
};
