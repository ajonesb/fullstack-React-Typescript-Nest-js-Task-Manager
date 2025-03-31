// src/auth/dto/login.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ajonesb' })
  @IsString()
  username: string;

  @ApiProperty({ example: '5527379' })
  @IsString()
  password: string;
}
