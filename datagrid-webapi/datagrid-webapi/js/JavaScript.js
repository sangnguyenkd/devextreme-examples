$(function () {

    $("#grid").dxDataGrid({
        height: 800,
        remoteOperations: { paging: true, filtering: true, sorting: true, grouping: true, summary: true, groupPaging: true },
        dataSource: DevExpress.data.AspNet.createStore({
            key: "OrderID",
            loadUrl: "api/Orders",
            insertUrl: "api/Orders/Post",
            updateUrl: "api/Orders/Put",
            deleteUrl: "api/Orders/Delete"
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
                dataField: "OrderID",
                formItem: {
                    visible: false
                }
            },
            {
                caption: "Customer",
                calculateDisplayValue: "CustomerName",
                dataField: "CustomerID",
                lookup: {
                    valueExpr: "CustomerID",
                    displayExpr: "ContactName",
                    dataSource: {
                        paginate: true,
                        store: DevExpress.data.AspNet.createStore({
                            key: "CustomerID",
                            loadUrl: "api/Customers"
                        })
                    }
                }
            },
            {
                caption: "Employee",
                calculateDisplayValue: "EmployeeName",
                dataField: "EmployeeID",
                lookup: {
                    valueExpr: "EmployeeID",
                    displayExpr: "FullName",
                    dataSource: {
                        paginate: true,
                        store: DevExpress.data.AspNet.createStore({
                            key: "EmployeeID",
                            loadUrl: "api/Employees"
                        })
                    }
                }
            },
            { dataField: "OrderDate", dataType: "date" },
            { dataField: "RequiredDate", dataType: "date" },
            { dataField: "ShippedDate", dataType: "date" },
            {
                dataField: "ShipVia",
                calculateDisplayValue: "ShipViaName",
                lookup: {
                    valueExpr: "ShipperID",
                    displayExpr: "CompanyName",
                    dataSource: {
                        paginate: true,
                        store: DevExpress.data.AspNet.createStore({
                            key: "ShipperID",
                            loadUrl: "api/Shippers"
                        })
                    }
                }
            },
            "Freight",
            "ShipName",
            "ShipAddress",
            "ShipCity",
            "ShipCountry"
        ]
    });

    function masterDetailTemplate(container, options) {
        $("<div>").addClass("grid").appendTo(container).dxDataGrid({
            remoteOperations: true,
            dataSource: {
                filter: ["CustomerID", "=", options.key],
                store: DevExpress.data.AspNet.createStore({
                    key: ["CustomerID", "OrderID"],
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
                    OrderID: options.key,
                    Quantity: 1,
                    Discount: 0
                }
            },
            onEditorPreparing: function (e) {
                if (e.dataField === "OderID") {
                    var dataGrid = e.component;
                    var valueChanged = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function (args) {
                        valueChanged.apply(this, arguments);

                        var product = args.component.getDataSource().items().filter(function (data) { return data.ProductID === args.value })[0];

                        if (product) {
                            dataGrid.cellValue(e.row.rowIndex, "UnitPrice", product.UnitPrice);
                        }
                    }
                }
            },
            columns: [
                {
                    dataField: "OrderID",
                    caption: "Order ID",
                },
                {
                    dataField: "OrderDate",
                    caption: "Order Date",
                },
                {
                    dataField: "ShippedDate",
                    caption: "Shipped Date",
                },
                {
                    dataField: "ShipAddress",
                    caption: "Ship Address",
                },
                {
                    dataField: "ShipPostalCode",
                    caption: "Ship Postal Code",
                }
            ]
        })
    }
});


