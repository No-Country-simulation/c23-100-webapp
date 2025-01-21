import { Global, Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'node:path';
import { envs } from '../../config/envs';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envs.mails.host,
        secure: false,
        auth: {
          user: envs.mails.auth.user,
          pass: envs.mails.auth.password,
        },
      },
      defaults: {
        from: `"NoCountry Medical" <${envs.mails.auth.user}>`,
      },
      template: {
        dir: join(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
