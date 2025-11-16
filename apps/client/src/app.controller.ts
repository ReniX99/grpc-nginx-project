import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloMessage } from './interfaces/api-services.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Body('name') name: string): Promise<HelloMessage> {
    return this.appService.getHello(name);
  }
}
