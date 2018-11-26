import {ReadonlyDictionary} from "dictionary-types";

export type Record = ReadonlyDictionary<string>;

export function tableToRecords(table: ReadonlyArray<ReadonlyArray<string>>): ReadonlyArray<Record> {
    const header = table[0];

    const objects: Array<{ [name: string]: string }> = [];

    for (let i = 1; i < table.length; ++i) {
        const row = table[i];
        const object: { [name: string]: string } = {};

        for (let j = 0; j < row.length && j < header.length; ++j) {
            const name = header[j];
            object[name] = row[j];
        }

        objects.push(Object.freeze(object));
    }

    return Object.freeze(objects);
}

export function recordsToTable(records: ReadonlyArray<Record>): ReadonlyArray<ReadonlyArray<string>> {
    if (records.length === 0) {
        return [];
    }

    const headers = Object.keys(records[0]);

    return Object.freeze([headers]
        .concat(records
            .map(record => headers
                .map(header => {
                    if (header in record) {
                        return record[header];
                    } else {
                        throw new Error("Inconsistent records.");
                    }
                }))));
}
