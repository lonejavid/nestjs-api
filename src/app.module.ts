import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const useSqlite = config.get<boolean>('database.useSqlite');
        const entities = [User];
        const isVercel = process.env.VERCEL === '1';
        const synchronize = useSqlite ? true : !isVercel;

        if (useSqlite) {
          const sqlitePath =
            config.get<string>('database.sqlitePath') ?? 'schedley.sqlite';
          return {
            type: 'sqljs',
            location: sqlitePath,
            autoSave: true,
            entities,
            synchronize: true,
          };
        }
        const url = config.get<string>('database.url');
        if (url) {
          return {
            type: 'postgres',
            url,
            entities,
            synchronize,
            ssl:
              config.get<string>('database.ssl') === 'true'
                ? { rejectUnauthorized: false }
                : false,
          };
        }
        return {
          type: 'postgres',
          host: String(config.get('database.host') ?? 'localhost'),
          port: Number(config.get('database.port') ?? 5432),
          username: String(config.get('database.username') ?? 'postgres'),
          password: String(config.get('database.password') ?? 'postgres'),
          database: String(config.get('database.database') ?? 'schedley'),
          entities,
          synchronize,
          ssl:
            config.get<string>('database.ssl') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
