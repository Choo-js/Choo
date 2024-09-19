export interface RoutePathMetadata {
    get?: string;
    post?: string;
    put?: string;
    patch?: string;
    delete?: string;
}

export const RoutePathMetadataKey = "route::path";
export const MethodTypeMetadataKey = "info::method_type";
export const ClassTypeMetadataKey = "info::class_type";
export const RequestParamIndexMetadataKey = "fn::index::request";
export const ReplyParamIndexMetadataKey = "fn::index::reply";
export const ContextParamIndexMetadataKey = "fn::index::context";
export const MiddlewareTypeKey = "route::middleware_type";
