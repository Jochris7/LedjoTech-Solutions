import { Injectable } from '@nestjs/common';
import { CreateStatsMensuelleDto } from './dto/create-stats_mensuelle.dto';
import { UpdateStatsMensuelleDto } from './dto/update-stats_mensuelle.dto';

@Injectable()
export class StatsMensuellesService {
  create(createStatsMensuelleDto: CreateStatsMensuelleDto) {
    return 'This action adds a new statsMensuelle';
  }

  findAll() {
    return `This action returns all statsMensuelles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statsMensuelle`;
  }

  update(id: number, updateStatsMensuelleDto: UpdateStatsMensuelleDto) {
    return `This action updates a #${id} statsMensuelle`;
  }

  remove(id: number) {
    return `This action removes a #${id} statsMensuelle`;
  }
}
