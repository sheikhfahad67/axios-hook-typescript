"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultipartInterceptor = exports.useJsonApiInterceptor = void 0;
var json_api_hook_1 = require("./hooks/json-api-hook");
Object.defineProperty(exports, "useJsonApiInterceptor", { enumerable: true, get: function () { return json_api_hook_1.useJsonApiInterceptor; } });
var multipart_api_hook_1 = require("./hooks/multipart-api-hook");
Object.defineProperty(exports, "useMultipartInterceptor", { enumerable: true, get: function () { return multipart_api_hook_1.useMultipartInterceptor; } });
