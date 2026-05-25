"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortLinkController = void 0;
const common_1 = require("@nestjs/common");
const short_link_service_1 = require("./short-link.service");
const create_short_link_dto_1 = require("./dto/create-short-link.dto");
let ShortLinkController = class ShortLinkController {
    shortLinkService;
    constructor(shortLinkService) {
        this.shortLinkService = shortLinkService;
    }
    async createShortLink(createShortLinkDto) {
        const link = await this.shortLinkService.create(createShortLinkDto.url);
        return {
            shortCode: link.shortCode,
        };
    }
    async redirect(shortCode, res) {
        const link = await this.shortLinkService.findOneByCode(shortCode);
        if (!link) {
            throw new common_1.NotFoundException('Short link not found');
        }
        return res.redirect(301, link.longUrl);
    }
};
exports.ShortLinkController = ShortLinkController;
__decorate([
    (0, common_1.Post)('shorten'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_short_link_dto_1.CreateShortLinkDto]),
    __metadata("design:returntype", Promise)
], ShortLinkController.prototype, "createShortLink", null);
__decorate([
    (0, common_1.Get)(':shortCode'),
    __param(0, (0, common_1.Param)('shortCode')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShortLinkController.prototype, "redirect", null);
exports.ShortLinkController = ShortLinkController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [short_link_service_1.ShortLinkService])
], ShortLinkController);
//# sourceMappingURL=short-link.controller.js.map