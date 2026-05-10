import { IsNumber, IsString, Max, Min, MaxLength } from 'class-validator';

export class CreateStatsMensuelleDto {
  @IsNumber()
  @Min(2000)
  @Max(2100)
  annee!: number;

  @IsNumber()
  @Min(1)
  @Max(12)
  mois!: number;

  @IsString()
  @MaxLength(5)
  moisLabel!: string;

  @IsNumber()
  revenus!: number;

  @IsNumber()
  depenses!: number;

  @IsNumber()
  benefice!: number;
}
