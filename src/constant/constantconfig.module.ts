import { Global, Module } from '@nestjs/common';
import { ConstantconfigService } from './constantconfig.service';


@Module({
  providers: [ConstantconfigService],
  exports: [ConstantconfigService]
})
export class ConstantconfigModule {}
