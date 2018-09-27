using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace lib_Catalog.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        public ActionResult MainPage()
        {
            return View();
        }
    }
}