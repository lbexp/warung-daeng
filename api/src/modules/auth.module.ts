import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../service/auth.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
