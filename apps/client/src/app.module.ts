import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import * as fs from 'fs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'API_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'api',
          protoPath: join(__dirname, '../proto/api.proto'),
          url: 'nginx:8080',
          credentials: credentials.createSsl(
            Buffer.from(fs.readFileSync(join(__dirname, '../certs/ca.pem'))),
            Buffer.from(
              fs.readFileSync(join(__dirname, '../certs/client-key.pem')),
            ),
            Buffer.from(
              fs.readFileSync(join(__dirname, '../certs/client.pem')),
            ),
          ),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
