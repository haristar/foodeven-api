import { Global, Module } from '@nestjs/common';
import { MsgConfigService } from './msgconfig.service';


@Module({
    providers: [MsgConfigService],
    exports: [MsgConfigService]
})

export class MsgconfigModule {}
