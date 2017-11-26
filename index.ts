export type Record = {readonly [name: string]: string};

export function tableToRecords(table: ReadonlyArray<ReadonlyArray<string>>): ReadonlyArray<Record> {
    let header = table[0];

    let objects: {[name: string]: string}[] = [];

    for (let i = 1; i < table.length; ++i) {
        let row = table[i];
        let object: {[name: string]: string} = {};

        for (let j = 0; j < row.length && j < header.length; ++j) {
            let name = header[j];
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

    let headers = Object.keys(records[0]);

    return Object.freeze([headers]
            .concat(records
                    .map(record => headers
                            .map(header => {
                                if (header in record) {
                                    return record[header];
                                } else {
                                    throw new Error('Inconsistent records.');
                                }
                            }))));
}
