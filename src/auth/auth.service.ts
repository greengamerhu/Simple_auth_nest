import { Injectable } from '@nestjs/common';
import User from 'src/user.entity';
import * as crypto from 'crypto';
import Token from './token.entity';
import { DataSource } from 'typeorm';
@Injectable()
export class AuthService {
    constructor(private dataSource : DataSource) {}
async findUserByToken (token : string) {
  const tokenRepo = this.dataSource.getRepository(Token)
  const tokenOjb = await tokenRepo.findOne({
    where : {token},
    relations : {user : true}
  })
  if (tokenOjb == null) {
    return null
  }
  return tokenOjb.user
}

    async generateTokenFor(user: User) {
      const veletlen =   crypto.randomBytes(32)
      const tokenString =  veletlen.toString("hex")
      const token = new Token()
      token.user = user
      token.token = tokenString
      this.dataSource.getRepository(Token).insert(token)
      return tokenString;
    }

}
