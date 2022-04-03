"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1648488032494 = void 0;
class Users1648488032494 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Users(
            id INT PRIMARY KEY AUTO_INCREMENT,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            age INT CHECK (age>0),
            phone VARCHAR (255) NOT NULL UNIQUE,
            email VARCHAR (255) NOT NULL UNIQUE,
            password VARCHAR (255) NOT NULL,
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP    
        )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Users
        `);
    }
}
exports.Users1648488032494 = Users1648488032494;
//# sourceMappingURL=1648488032494-Users.js.map