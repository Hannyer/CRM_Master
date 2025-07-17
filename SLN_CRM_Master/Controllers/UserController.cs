
using EntityLayer;
using Newtonsoft.Json;
using Service.IService;
using Service.Service;
using SLN_CRM_Master.model.ExternalServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.ApplicationServices;
using System.Web.Mvc;

namespace SLN_CRM_Master.Controllers
{
    public class UserController : Controller
    {
        private IUserService _service;
        IRoleService _roleService;
        IIdentificationTypeService _IdentificationTypeService;
        public UserController(IUserService userService, IRoleService roleService, IIdentificationTypeService identificationTypeService)
        {
            this._service = userService;
            _roleService = roleService;
            _IdentificationTypeService = identificationTypeService;
        }
        // GET: User
        public ActionResult Index()
        {

            if (Session["User"] == null || Session["List_Menu"] == null)
            {

                return RedirectToAction("Index", "Login");
            }
            FillDropDownListRole();
            FillDropDownListIdentificationType();
            var list = _service.GetList(new UserE());           
            return View(list);
        }
        public void FillDropDownListRole()
        {
            var roles = _roleService.GetList(new RoleE() { Opcion = 1 });


            var roleList = roles.Select(role => new SelectListItem
            {
                Value = role.ID_Role.ToString(),
                Text = role.Description
            });


            ViewBag.RoleList = roleList;

        }
        public string NewUser(int P_OPCION, int P_ID, string P_USER, string P_PASSWORD, int P_ROLE)
        {
            string answer = "";
            bool tmpAnswer = _service.Maintenance(P_OPCION, P_ID, P_USER, P_PASSWORD, P_ROLE);
            if (tmpAnswer)
            {
                answer = "Usuario agregada con éxito";
                RedirectToAction("Index");
            }
            else
            {
                answer = "Ha ocurrido un error";
            }
            return answer;
        }

        [HttpPost]
        public string UpdateUser(UserE UserRequest)
        {

            try
            {
                string answer = "";
                bool result = _service.Maintenance(UserRequest);
                if (result)
                {
                    answer = "¡Usuario modificado exitosamente!";
                    RedirectToAction("Index");

                }
                else
                {
                    answer = "Ha ocurrido un error al modificar el usuario";
                }
                return answer;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [HttpPost]
        public string AddUser(UserE UserRequest)
        {

            try
            {
                string answer = "";
                bool result = _service.Maintenance(UserRequest);
                if (result)
                {
                    answer = "¡Usuario agregado exitosamente!";
                    RedirectToAction("Index");

                }
                else
                {
                    answer = "Ha ocurrido un error al agregar el usuario";
                }
                return answer;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        public string DeleteUser(UserE UserRequest)
        {

            try
            {
                string answer = "";
                bool result = _service.Maintenance(UserRequest);
                if (result)
                {
                    answer = "¡Usuario eliminado exitosamente!";
                    RedirectToAction("Index");

                }
                else
                {
                    answer = "Ha ocurrido un error al agregar el usuario";
                }
                return answer;
            }
            catch (Exception ex)
            {

                throw;
            }
        }



        public void FillDropDownListIdentificationType()
        {
            var Identification = _IdentificationTypeService.GetList(new IdentificationTypeE() { Opcion = 0 });


            var IdentificationList = Identification.Select(IdentificationL => new SelectListItem
            {
                Value = IdentificationL.ID.ToString(),
                Text = IdentificationL.Description
            });


            ViewBag.IdentificationList = IdentificationList;

        }

        [HttpPost]
        public async Task<ActionResult> SearchUserByCedula(string cedula)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(cedula) || !System.Text.RegularExpressions.Regex.IsMatch(cedula, @"^\d{9,}$"))
                {
                    return Json(new { success = false, message = "La cédula debe contener al menos 9 dígitos numéricos." }, JsonRequestBehavior.AllowGet);
                }


                var resultado = await ApiGometaServer.SeachClient(cedula);

                    return Json(new { success = true, data = resultado.Results.FirstOrDefault() }, JsonRequestBehavior.AllowGet);
              
            }
            catch (HttpRequestException ex)
            {
                
                return Json(new { success = false, message = $"Error de conexión: {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
            catch (JsonException ex)
            {
              
                return Json(new { success = false, message = $"Error al procesar la respuesta: {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
              
                return Json(new { success = false, message = $"Excepción: {ex.Message}" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult RefresUserList()
        {

            var list = _service.GetList(new UserE());
            return PartialView("PartialViewUser", list);
        }
    }
}