using CRM_Master_API.IServices;
using EntityLayer;
using Repository.Core.IRepository;

namespace CRM_Master_API.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        public UserService(IUserRepository iUserRepository)
        {
            this._userRepository = iUserRepository;
        }

      
        public List<UserE> GetList(UserE user)
        {
            try
            {
                return _userRepository.GetList(user);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool Maintenance(int P_OPCION, int P_ID, string P_USER, string P_PASSWORD, int P_ROLE)
        {
            throw new NotImplementedException();
        }

        public bool Maintenance(UserE user)
        {
            try
            {
                return _userRepository.Maintenance(user);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
