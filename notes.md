## ConfigModule

imports: [
  ConfigModule.forRoot({
    isGlobal: true, // Makes ConfigService globally available without re-importing
  }),
  DatabaseModule,
]

## .env
DB_HOST=localhost
DB_PORT=5432

## Without ConfigModule:
process.env.DB_HOST

## With ConfigModule:
configService.get('DB_HOST')
