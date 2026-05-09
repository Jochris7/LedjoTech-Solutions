/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCategorieServiceDto {
  @IsString()
  @MaxLength(80)
  nom!: string;

  @IsNumber()
  @Min(0)
  chiffreAffaires!: number;

  @IsString()
  @MaxLength(9)
  couleur!: string;

  @IsNumber()
  @IsOptional()
  ordre?: number;
}
