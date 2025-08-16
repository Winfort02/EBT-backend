import { PrismaClient } from '.prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KEYS } from 'src/constants';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

   /**
    * Prisma Service Constructor
    * @param config 
    */
   constructor(config: ConfigService) {
      super({
         datasources: {
            db: {
               url: config.get<string>(KEYS.DATABSE_URL)
            }
         }
      })
   }

   /**
    * Method to connect with prisma client if the module is initialized
    */
   async onModuleInit() {
      await this.$connect();
   }

   /**
    * Method to disconnect with prisma client if the module was destroyed
    */
   async onModuleDestroy() {
      await this.$disconnect();
   }
}
