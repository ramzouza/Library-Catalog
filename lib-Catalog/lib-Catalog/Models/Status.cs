using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lib_Catalog.Models
{
    public class Status
    {
        public Status(bool status, string msg)
        {
            this.status = status;
            this.message = msg;
        }
        public bool status { get; set; }

        public string message { get; set; }
    }
}