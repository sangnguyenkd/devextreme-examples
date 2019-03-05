$(function() {

    $("#grid").dxDataGrid({
        height: 800,
        remoteOperations: { paging: true, filtering: true, sorting: true, grouping: true, summary: true, groupPaging: true },
        dataSource: DevExpress.data.AspNet.createStore({
            key: "CustomerID",
            loadUrl: "api/Customers",
            insertUrl: "api/Customers/Post",
            updateUrl: "api/Customers/Put",
            deleteUrl: "api/Customers/Delete"
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
        onInitNewRow: function(e) {
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
                formItem: {
                    visible: false
                }
            },
            {
                caption: "Customer Name",
                calculateDisplayValue: "ContactName",
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
                caption: "City",
                calculateDisplayValue: "City",
                dataField: "CustomerID",
                lookup: {
                    valueExpr: "CustomerID",
                    displayExpr: "City",
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
                caption: "Order Quantity",
                calculateDisplayValue: "OrderQuantity",
                dataField: "CustomerID",
                lookup: {
                    valueExpr: "CustomerID",
                    displayExpr: "OrderQuantity",
                    dataSource: {
                        paginate: true,
                        store: DevExpress.data.AspNet.createStore({
                            key: "CustomerID",
                            loadUrl: "api/Customers"
                        })
                    }
                }
            },
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
                    insertUrl: "api/OrderDetails/Post",
                    updateUrl: "api/OrderDetails/Put",
                    deleteUrl: "api/OrderDetails/Delete",
                })
            },
            showBorders: true,
            editing: {
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true
            },
            onInitNewRow: function(e) {
                e.data = {
                    OrderID: options.key,
                    Quantity: 1,
                    Discount: 0
                }
            },
            onEditorPreparing: function(e) {
                if(e.dataField === "ProductID") {
                    var dataGrid = e.component;
                    var valueChanged = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function(args) {
                        valueChanged.apply(this, arguments);

                        var product = args.component.getDataSource().items().filter(function(data) { return data.ProductID === args.value })[0];

                        if(product) {
                            dataGrid.cellValue(e.row.rowIndex, "UnitPrice", product.UnitPrice);
                        }
                    }
                }
            },
            columns: [
                {
                    dataField: "OrderID",
                    caption: "OrderID",
                    calculateDisplayValue: "OrderID",
                    lookup: {
                        valueExpr: "OrderID",
                        displayExpr: "OrderID",
                        dataSource: {
                            paginate: true,
                            store: DevExpress.data.AspNet.createStore({
                                key: "OrderID",
                                loadUrl: "api/Orders"
                            })
                        }
                    }
                },
                {
                    dataField: "OrderDate",
                    caption: "OrderDate",
                    calculateDisplayValue: "OrderDate",
                    lookup: {
                        valueExpr: "OrderDate",
                        displayExpr: "OrderDate",
                        dataSource: {
                            paginate: true,
                            store: DevExpress.data.AspNet.createStore({
                                key: "OrderID",
                                loadUrl: "api/Orders"
                            })
                        }
                    }
                },
                {
                    dataField: "OrderDate",
                    caption: "OrderDate",
                    calculateDisplayValue: "OrderDate",
                    lookup: {
                        valueExpr: "OrderDate",
                        displayExpr: "OrderDate",
                        dataSource: {
                            paginate: true,
                            store: DevExpress.data.AspNet.createStore({
                                key: "OrderID",
                                loadUrl: "api/Orders"
                            })
                        }
                    }
                },
                {
                    dataField: "RequiredDate",
                    caption: "Required Date",
                    calculateDisplayValue: "RequiredDate",
                    lookup: {
                        valueExpr: "RequiredDate",
                        displayExpr: "RequiredDate",
                        dataSource: {
                            paginate: true,
                            store: DevExpress.data.AspNet.createStore({
                                key: "OrderID",
                                loadUrl: "api/Orders"
                            })
                        }
                    }
                },
                {
                    dataField: "ShippedDate",
                    caption: "Shipped Date",
                    calculateDisplayValue: "ShippedDate",
                    lookup: {
                        valueExpr: "ShippedDate",
                        displayExpr: "ShippedDate",
                        dataSource: {
                            paginate: true,
                            store: DevExpress.data.AspNet.createStore({
                                key: "OrderID",
                                loadUrl: "api/Orders"
                            })
                        }
                    }
                },
                {
                    dataField: "ShipAddress",
                    caption: "Ship Address",
                    calculateDisplayValue: "ShipAddress",
                    lookup: {
                        valueExpr: "ShipAddress",
                        displayExpr: "ShipAddress",
                        dataSource: {
                            paginate: true,
                            store: DevExpress.data.AspNet.createStore({
                                key: "OrderID",
                                loadUrl: "api/Orders"
                            })
                        }
                    }
                }
            ]
        })
    }
});