export type DecoratorResult =
    | ClassDecorator
    | MethodDecorator
    | PropertyDecorator
    | ParameterDecorator;

export type Decorator = (...args: any) => DecoratorResult;
