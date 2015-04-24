using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Operators.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Work Providers";

            return View();
        }
        public ActionResult List()
        {
            return PartialView();
        }
        public ActionResult Detail()
        {
            return PartialView();
        }
        public ActionResult Edit()
        {
            return PartialView();
        }
        public ActionResult Cities()
        {
            return PartialView();
        }
        public ActionResult Providers()
        {
            return PartialView();
        }
    }
}
