export type Table = string[][];

export type ReadonlyTable = ReadonlyArray<ReadonlyArray<string>>;

export function tableToRecords(table: ReadonlyTable): Array<Record<string, string>> {
    const header = table[0];

    const records: Array<Record<string, string>> = [];

    for (let i = 1; i < table.length; ++i) {
        const row = table[i];
        const record: Record<string, string> = {};

        for (let j = 0; j < row.length && j < header.length; ++j) {
            const name = header[j];
            record[name] = row[j];
        }

        records.push(record);
    }

    return records;
}

export function recordsToTable(records: ReadonlyArray<Readonly<Record<string, string>>>): Table {
    if (records.length === 0) {
        return [];
    }

    const headers = Object.keys(records[0]);

    return [headers]
        .concat(records
            .map(record => headers
                .map(header => {
                    if (header in record) {
                        return record[header];
                    } else {
                        throw new Error("Inconsistent records.");
                    }
                })));
}
