import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postgres from 'postgres';

@Injectable()
export class DatabaseService {
  private readonly _connection: any;

  constructor(private configService: ConfigService) {
    this._connection = postgres({
      database: configService.get<string>('DATABASE_NAME'),
      host: configService.get<string>('DATABASE_HOST'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USER'),
    });
  }

  get connection() {
    return this._connection;
  }
}
