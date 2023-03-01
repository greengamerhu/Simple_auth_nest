import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import User from 'src/user.entity';
import { DataSource } from 'typeorm';
import LoginDto from './login.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private dataSource: DataSource, private authservice : AuthService ) {

    }

    @Post('login')
    async login(@Body() loginData : LoginDto) {
            const userRepo = this.dataSource.getRepository(User)
            const user = await userRepo.findOneBy({email : loginData.email})
            if(user == null) {
                throw new UnauthorizedException("Hibás email vagy jelszo")
            }

            if(!await bcrypt.compare(loginData.password, user.password)) {
                throw new UnauthorizedException("Hibás email vaaaagy jelszo")
            }
            return {token : await this.authservice.generateTokenFor(user) }
        }
    }

