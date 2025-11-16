import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiService, HelloMessage } from './interfaces/api-services.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private apiService: ApiService;

  constructor(@Inject('API_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.apiService = this.client.getService<ApiService>('ApiService');
  }

  async getHello(name: string): Promise<HelloMessage> {
    const response = this.apiService.sendMessage({ name });

    const objResponse = await firstValueFrom(response);
    return objResponse;
  }
}
