export class XerTable {
    public readonly name: string;
    public readonly fields: string[];
    public readonly rows: string[][];

    constructor(name: string, fields: string[], rows: string[][]) {
        this.name = name;
        this.fields = fields;
        this.rows = rows;
    }
}