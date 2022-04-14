let rowData
let detRowData
const columnDefs = [
    {field: "id", width: 75},
    {field: "name"},
    {field: "username"},
    {field: "email"},
]
const detColumnDefs = [
    {field: "id", width: 75},
    {field: "title"},
    {field: "body"},
]
const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowSelection: 'single',
    onSelectionChanged: onSelectionChanged,
};
const detGridOptions = {
    columnDefs: detColumnDefs,
    rowData: detRowData,
}

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        .then(data => gridOptions.api.setRowData(data))
})

const detGridDiv = document.querySelector('#detGrid');

new agGrid.Grid(detGridDiv, detGridOptions)

function onSelectionChanged() {
    const selectedRows = gridOptions.api.getSelectedRows();
    let selectedUserId = selectedRows[0].id
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + selectedUserId)
        .then((response) => response.json())
        .then(data => detGridOptions.api.setRowData(data))
}
