import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('ApiService', 'SendMessage')
  sendMessage(data: any) {
    return { message: `Hello, ${data.name}!` };
  }
}
