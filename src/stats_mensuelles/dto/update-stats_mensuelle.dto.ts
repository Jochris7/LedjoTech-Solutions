import { PartialType } from '@nestjs/mapped-types';
import { CreateStatsMensuelleDto } from './create-stats_mensuelle.dto';

export class UpdateStatsMensuelleDto extends PartialType(
  CreateStatsMensuelleDto,
) {}
