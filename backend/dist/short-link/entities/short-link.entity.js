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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortLink = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const analytics_entity_1 = require("../../analytics/entities/analytics.entity");
let ShortLink = class ShortLink {
    id;
    shortCode;
    longUrl;
    createdAt;
    analytics;
};
exports.ShortLink = ShortLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ShortLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ShortLink.prototype, "shortCode", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ShortLink.prototype, "longUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ShortLink.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => analytics_entity_1.Analytics, (analytics) => analytics.shortLink),
    __metadata("design:type", Array)
], ShortLink.prototype, "analytics", void 0);
exports.ShortLink = ShortLink = __decorate([
    (0, typeorm_1.Entity)()
], ShortLink);
//# sourceMappingURL=short-link.entity.js.map