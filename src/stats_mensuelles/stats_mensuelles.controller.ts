import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { StatsMensuellesService } from './stats_mensuelles.service';
import { CreateStatsMensuelleDto } from './dto/create-stats_mensuelle.dto';
import { UpdateStatsMensuelleDto } from './dto/update-stats_mensuelle.dto';

@Controller('stats-mensuelles')
export class StatsMensuellesController {
  constructor(
    private readonly statsMensuellesService: StatsMensuellesService,
  ) {}

  @Post()
  create(@Body() dto: CreateStatsMensuelleDto) {
    return this.statsMensuellesService.create(dto);
  }

  @Get()
  findAll() {
    return this.statsMensuellesService.findAll();
  }

  @Get('year/:annee')
  findByYear(@Param('annee', ParseIntPipe) annee: number) {
    return this.statsMensuellesService.findByYear(annee);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.statsMensuellesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStatsMensuelleDto,
  ) {
    return this.statsMensuellesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.statsMensuellesService.remove(id);
  }
}
