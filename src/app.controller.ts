import { Body, Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import User from './user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @UseGuards(AuthGuard('bearer'))
  @Get('profile') 
  ownProfile(@Request() req) {
    const user = req.user as User
    return {
      email : user.email,
      favColor: user.favColor
    }
  }
}
