import {notNull} from "@softwareventures/nullable";

export type Table = string[][];

export type ReadonlyTable = ReadonlyArray<ReadonlyArray<string>>;

export function* tableToRecords(table: ReadonlyTable): Iterable<Record<string, string>> {
    const header = notNull(table[0]);

    for (let i = 1; i < table.length; ++i) {
        const row = notNull(table[i]);
        const record: Record<string, string> = {};

        for (let j = 0; j < row.length && j < header.length; ++j) {
            const name = notNull(header[j]);
            record[name] = notNull(row[j]);
        }

        yield record;
    }
}

export function recordsToTable(records: ReadonlyArray<Readonly<Record<string, string>>>): Table {
    if (records.length === 0) {
        return [];
    }

    const headers = Object.keys(notNull(records[0]));

    return [headers]
        .concat(records
            .map(record => headers
                .map(header => {
                    if (header in record) {
                        return notNull(record[header]);
                    } else {
                        throw new Error("Inconsistent records.");
                    }
                })));
}
