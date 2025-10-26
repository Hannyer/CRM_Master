using CRM_Master_API.DTO;
using CRM_Master_API.IServices;
using CRM_Master_API.Request;
using EntityLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Service;
using System.Reflection;

namespace CRM_Master_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {

        private IUserService _UserService;
       private IConfigurationService _configurationServices;

        public LoginController(IUserService services, IConfigurationService cservice)
        {
            _UserService = services;
            _configurationServices = cservice;

        }
        public class LoginRequest
        {
            public string Username { get; set; } = "";
            public string Password { get; set; } = "";
        }

        public record LoginResponse(string Token, UserE User);

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _UserService.GetList(new UserE() { Email = request.Username }).Where(x => x.Email.ToLower() == request.Username.ToLower()).FirstOrDefault();

            if (user != null)
            {
                if (user.Password == request.Password)
                {
                    if (user.Status)
                    {
                        var rolClient = _configurationServices.GetList(new ConfigurationE()
                        {
                            Opcion = 0,
                            KEY01 = "PARAMETRO",
                            KEY02 = "FUNCIONALIDAD",
                            KEY03 = "MRB",
                            KEY04 = "ROL",
                            KEY05 = "CLIENTE",
                            KEY06 = "ROLCLIENTE"
                        });
                        user.IsExternal = user.Id_Role.ToString().Equals(rolClient.FirstOrDefault().Value);
                        
                        var fakeToken = "fake.jwt.token";
                        return Ok(new LoginResponse(fakeToken, user));
                    }
                    else
                    {
                        return Unauthorized(new { message = "Credenciales incorrectas. Por favor, verifica tu usuario y contraseña." });
                    }


                }
                else
                {
                    return Unauthorized(new { message = "Credenciales incorrectas. Por favor, verifica tu usuario y contraseña." });
                }
            }
            else
            {
                return Unauthorized(new { message = "Credenciales incorrectas. Por favor, verifica tu usuario y contraseña." });
            }
            
        }

        [HttpOptions("login")]
        public IActionResult OptionsLogin() => Ok();

        [HttpPost("ListSettings")]
        public async Task<ActionResult<PagedResult<ConfigurationDto>>> List([FromBody] ConfigurationFilterRequest req)
        {
            var List =  _configurationServices.GetList(new ConfigurationE() {Opcion=0,Page=req.Page,PageSize=req.PageSize,
            Search=req.Search, Sort=req.Sort});
            return Ok(new PagedResult<ConfigurationDto>(List, List.Count()));
        }
        }
}
