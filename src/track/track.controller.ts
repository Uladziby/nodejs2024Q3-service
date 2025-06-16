import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { TrackService } from 'src/track/track.service';

@Controller('user')
@ApiTags('Users')
@ApiBearerAuth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.remove(id);
  }
}
