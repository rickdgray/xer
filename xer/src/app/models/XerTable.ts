export class XerTable {
    public name: string;
    public fields: string[];
    public rows: string[][];

    constructor() {
        this.name = '';
        this.fields = [];
        this.rows = [[]];
    }
}