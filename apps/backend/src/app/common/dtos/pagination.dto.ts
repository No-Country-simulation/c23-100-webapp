import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @ApiProperty({
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit = 6;
}
