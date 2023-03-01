import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import User from './user.entity';

@Injectable()
export class AppService {
constructor(  
  private dataSource: DataSource,

) {}

  getHello(): string {
    return 'Hello World!';
  }


}
