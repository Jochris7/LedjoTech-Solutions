import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatsMensuellesService } from './stats_mensuelles.service';
import { CreateStatsMensuelleDto } from './dto/create-stats_mensuelle.dto';
import { UpdateStatsMensuelleDto } from './dto/update-stats_mensuelle.dto';

@Controller('stats-mensuelles')
export class StatsMensuellesController {
  constructor(private readonly statsMensuellesService: StatsMensuellesService) {}

  @Post()
  create(@Body() createStatsMensuelleDto: CreateStatsMensuelleDto) {
    return this.statsMensuellesService.create(createStatsMensuelleDto);
  }

  @Get()
  findAll() {
    return this.statsMensuellesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statsMensuellesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatsMensuelleDto: UpdateStatsMensuelleDto) {
    return this.statsMensuellesService.update(+id, updateStatsMensuelleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsMensuellesService.remove(+id);
  }
}
