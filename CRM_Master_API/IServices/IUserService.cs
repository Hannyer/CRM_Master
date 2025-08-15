using EntityLayer;

namespace CRM_Master_API.IServices
{
    public interface IUserService
    {
        #region SQL
        List<UserE> GetList(UserE user);
        bool Maintenance(int P_OPCION, int P_ID, string P_USER, string P_PASSWORD, int P_ROLE);
        bool Maintenance(UserE user);
        #endregion
    }
}
