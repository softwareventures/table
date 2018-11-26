import {Dictionary, ReadonlyDictionary} from "dictionary-types";

export type Record = Dictionary<string>;

export type ReadonlyRecord = ReadonlyDictionary<string>;

export function tableToRecords(table: ReadonlyArray<ReadonlyArray<string>>): Record[] {
    const header = table[0];

    const records: Record[] = [];

    for (let i = 1; i < table.length; ++i) {
        const row = table[i];
        const record: Record = {};

        for (let j = 0; j < row.length && j < header.length; ++j) {
            const name = header[j];
            record[name] = row[j];
        }

        records.push(record);
    }

    return records;
}

export function recordsToTable(records: ReadonlyArray<ReadonlyRecord>): string[][] {
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
