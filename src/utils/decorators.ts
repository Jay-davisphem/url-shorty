import { Request, Response, NextFunction } from "express";

interface ErrorHandlerOptions {
  status?: number;
  message?: string;
}

export function withErrorHandler(
  options?: ErrorHandlerOptions
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        console.log(`Calling ${String(propertyKey)} with`, req.body);
        await originalMethod.call(this, req, res, next);
      } catch (error) {
        console.error(
          `Error occurred in method ${String(propertyKey)}:`,
          error
        );
        const statusCode = options?.status || 500;
        const errorMessage =
          options?.message ||
          `Something went wrong With ${target} on ${propertyKey as string}`;
        res.status(statusCode).json({ error: errorMessage });
      }
    };
  };
}
