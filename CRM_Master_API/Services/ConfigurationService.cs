using EntityLayer;
using Repository.Core.IRepository;
using CRM_Master_API.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM_Master_API.DTO;
using AutoMapper;

namespace CRM_Master_API.Services
{
    public class ConfigurationService : IConfigurationService
    {
        IConfigurationRepository _configuration;

        private readonly IMapper _mapper;

        public ConfigurationService(IConfigurationRepository configuration, IMapper mapper)
        {
            _configuration = configuration;
            _mapper = mapper;
        }
        public List<ConfigurationDto> GetList(ConfigurationE configurationE)
        {
            return _mapper.Map<List<ConfigurationDto>>( _configuration.GetList(configurationE));
        }

        public int Maintenance(ConfigurationE configurationE)
        {
            return _configuration.Maintenance(configurationE);
        }
    }
}
