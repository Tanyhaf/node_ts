"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments1649003789585 = void 0;
const typeorm_1 = require("typeorm");
class Comments1649003789585 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'Comments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'text',
                    type: 'varchar',
                    width: 255,
                    isNullable: false,
                },
                {
                    name: 'authorId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'postId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'like',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'dislike',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['authorId'],
                    referencedTableName: 'Users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    columnNames: ['postId'],
                    referencedTableName: 'Posts',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('Comments', true);
    }
}
exports.Comments1649003789585 = Comments1649003789585;
//# sourceMappingURL=1649003789585-Comments.js.map