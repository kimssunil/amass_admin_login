"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const globalPrefix = 'api';
const versionPrefix = 'v';
const defaultVersion = '1';
const getApp = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('app', app);
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: versionPrefix,
        defaultVersion: defaultVersion,
    });
    return app;
};
exports.getApp = getApp;
async function bootstrap() {
    const app = await (0, exports.getApp)();
    const port = process.env.PORT || 4000;
    console.log('port', port);
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}/${versionPrefix}${defaultVersion}`);
}
if (process.env.NODE_ENV === 'development') {
    bootstrap();
}
//# sourceMappingURL=main.js.map