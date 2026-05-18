"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShortLinkDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_short_link_dto_1 = require("./create-short-link.dto");
class UpdateShortLinkDto extends (0, mapped_types_1.PartialType)(create_short_link_dto_1.CreateShortLinkDto) {
}
exports.UpdateShortLinkDto = UpdateShortLinkDto;
//# sourceMappingURL=update-short-link.dto.js.map