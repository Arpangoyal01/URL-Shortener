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
exports.Analytics = void 0;
const typeorm_1 = require("typeorm");
const short_link_entity_1 = require("../../short-link/entities/short-link.entity");
let Analytics = class Analytics {
    id;
    ipAddress;
    userAgent;
    visitedAt;
    shortLink;
};
exports.Analytics = Analytics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Analytics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analytics.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Analytics.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Analytics.prototype, "visitedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => short_link_entity_1.ShortLink, (shortLink) => shortLink.analytics, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", short_link_entity_1.ShortLink)
], Analytics.prototype, "shortLink", void 0);
exports.Analytics = Analytics = __decorate([
    (0, typeorm_1.Entity)()
], Analytics);
//# sourceMappingURL=analytics.entity.js.map