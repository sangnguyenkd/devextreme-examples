using datagrid_webapi.Models;
using DevExtreme.AspNet.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace datagrid_webapi.Controllers
{
    public class CustomersController : ApiController
    {
        private Northwind _db = new Northwind();
        [HttpGet]
        public HttpResponseMessage Get(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "CustomerID" };

            var customers = from c in _db.Customers
                         select new
                         {
                             c.Address,
                             c.City,
                             c.CompanyName,
                             c.ContactName,
                             c.ContactTitle,
                             c.Country,
                             c.CustomerID,
                             c.Fax,
                             c.Orders,
                             c.Phone,
                             c.PostalCode,
                             c.Region
                         };

            return Request.CreateResponse(DataSourceLoader.Load(customers, loadOptions));
        }
    }
}