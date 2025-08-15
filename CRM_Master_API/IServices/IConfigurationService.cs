using CRM_Master_API.DTO;
using EntityLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM_Master_API.IServices
{
    public interface IConfigurationService
    {
        List<ConfigurationDto> GetList(ConfigurationE configurationE);
        int Maintenance(ConfigurationE configurationE);
    }
}
