

export function createRecord(data){
    base('Table 1').create([
        {
            "fields": {
                'Name': data[0],
                'Card Number': data[1],
                'expiration': data[2]}
        }
    ])
}

export function selectRecord(number){
    base('Table 1').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: number,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            console.log('Retrieved', record.get('[Name, Card Number, expiration, Status]'));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export function getFirstPage(){
    base('Table 1').select({
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Name'));
        });
    });
}

export  function getRecord(){
    base('Table 1').find('recYyhqJyLl4rNmuz', function(err, record) {
        if (err) { console.error(err); return; }
        return record.fields;
    });
}

export function updateRecord(id, field){
    base('Table 1').update([
        {
            "id": id,
            "fields": {field}
        }
    ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function(record) {
            console.log(record.get('Name'));
        });
    });
}

export function deleteRecord(id){
    base('Table 1').destroy([id], function(err, deletedRecords) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
    });
}
