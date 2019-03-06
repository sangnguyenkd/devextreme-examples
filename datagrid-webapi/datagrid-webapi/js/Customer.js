$(function () {
    // Update dev 2
    // Update 3
    //Update 4
    // update 5
    $("#grid1").dxDataGrid({
        height: 800,
        remoteOperations: { paging: true, filtering: true, sorting: true, grouping: true, summary: true, groupPaging: true },
        dataSource: DevExpress.data.AspNet.createStore({
            key: "CustomerID",
            loadUrl: "api/Customers",
            insertUrl: "api/Customers/Post",
            updateUrl: "api/Customers/Put",
            deleteUrl: "api/Customers/Delete",
        }),
        editing: {
            mode: "form",
            form: {
                colCount: 4
            },
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true
        },
        onInitNewRow: function (e) {
            e.data = {
                OrderDate: new Date()
            };
        },
        columnAutoWidth: true,
        filterRow: { visible: true },
        groupPanel: { visible: true },
        grouping: { autoExpandAll: false },
        pager: {
            showInfo: true
        },
        masterDetail: {
            enabled: true,
            template: masterDetailTemplate
        },
        columns: [
            {
                dataField: "CustomerID",
                caption: "Customer ID"
            },
            {
                dataField: "CompanyName",
                caption: "Company Name"
            },
            {
                dataField: "ContactName",
                caption: "Contact Name"
            },
            {
                dataField: "City",
                caption: "City"
                
            },
            {
                dataField: "OrderQuantity",
                caption: "OrderQuantity"
            }
        ]
    });

    function masterDetailTemplate(container, options) {
        $("<div>").addClass("grid").appendTo(container).dxDataGrid({
            remoteOperations: true,
            dataSource: {
                filter: ["CustomerID", "=", options.key],
                store: DevExpress.data.AspNet.createStore({
                    key: "OrderID",
                    loadUrl: "api/Orders",
                    insertUrl: "api/Orders/Post",
                    updateUrl: "api/Orders/Put",
                    deleteUrl: "api/Orders/Delete",
                })
            },
            showBorders: true,
            editing: {
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true
            },
            onInitNewRow: function (e) {
                e.data = {
                    CustomerID: options.key
                }
            },
            columns: [
                {
                    dataField: "OrderID",
                    caption: "Order ID"
                },
                {
                    dataField: "OrderDate",
                    caption: "Order Date"
                },
                {
                    dataField: "ShipName",
                    caption: "Ship Name"
                }
            ]
        })
    }
});