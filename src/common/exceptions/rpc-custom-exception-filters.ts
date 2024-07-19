import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{

    catch(exception: RpcException, host: ArgumentsHost):void {
       // return throwError(()=>exception.getError());

       //console.log('Paso por aquí en nuestro Custom filter')

       //throw new UnauthorizedException('Hola Mundo');
       const ctx = host.switchToHttp();
       const response  = ctx.getResponse();

       const rpcError = exception.getError();

       if( 
            typeof rpcError === 'object' && 
            'status' in rpcError && 
            'message' in rpcError 
        ){
        const status = isNaN (+rpcError.status)? 400 : +rpcError.status ;
        return response.status(status).json(rpcError);
       }

       console.log({rpcError});

       response.status(400).json({
        status :400,
        message:  rpcError,
       })
    }

}