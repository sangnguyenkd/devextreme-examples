using datagrid_webapi.Models;
using DevExtreme.AspNet.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace datagrid_webapi.Controllers
{
    public class CustomersController : ApiController
    {
        private Northwind _db = new Northwind();
        //Default code are commended
        /*public HttpResponseMessage Get(DataSourceLoadOptions loadOptions)
        {
            return Request.CreateResponse(DataSourceLoader.Load(_db.Customers, loadOptions));
        }*/

        [HttpGet]
        public HttpResponseMessage Get(DataSourceLoadOptions loadOptions)
        {
            loadOptions.PrimaryKey = new[] { "CustomerID" };

            var customers = from cm in _db.Customers
                            select new
                            {
                                cm.CustomerID,
                                cm.ContactName,
                                cm.City,
                                cm.CompanyName,
                                OrderQuantity = (from o in _db.Orders
                                                where o.CustomerID == cm.CustomerID
                                                select o).Count()
                         };
            return Request.CreateResponse(DataSourceLoader.Load(customers, loadOptions));
        }
       
        [HttpPut]
        public HttpResponseMessage Put(FormDataCollection form)
        {
            var key = Convert.ToString(form.Get("key"));
            var values = form.Get("values");

            var customer = _db.Customers.Find(key);
            JsonConvert.PopulateObject(values, customer);

            Validate(customer);

            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState.GetFullErrorMessage());

            _db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage Post(FormDataCollection form)
        {
            var values = form.Get("values");
            var customer = new Customer();
            JsonConvert.PopulateObject(values, customer);

            Validate(customer);

            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState.GetFullErrorMessage());

            _db.Customers.Add(customer);
            _db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        public HttpResponseMessage Delete(FormDataCollection form)
        {
            var key = Convert.ToString(form.Get("key"));
            var customer = _db.Customers.Find(key);
            _db.Customers.Remove(customer);
            _db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}