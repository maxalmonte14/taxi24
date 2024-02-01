import { Controller, Get } from '@nestjs/common';
import { AppStatus } from './app-status.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get('/status')
  @ApiOperation({ summary: 'Get the current status of the application' })
  @ApiOkResponse({
    description: 'Request has been successful.',
    type: AppStatus,
  })
  status(): AppStatus {
    return new AppStatus({
      date: new Date(),
      status: 'up',
    });
  }
}
