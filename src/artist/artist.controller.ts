import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ArtistService } from 'src/artist/artist.service';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';

@Controller('artist')
@ApiTags('Artists')
@ApiBearerAuth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.remove(id);
  }
}
