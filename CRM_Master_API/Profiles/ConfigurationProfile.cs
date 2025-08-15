using AutoMapper;
using CRM_Master_API.DTO;
using EntityLayer;

namespace CRM_Master_API.Profiles
{
    public class ConfigurationProfile : Profile
    {
        public ConfigurationProfile()
        {

            CreateMap<ConfigurationE, ConfigurationDto>()
     .ForMember(d => d.PkConfiguration, o => o.MapFrom(s => s.PK_CONFIGURATION))
     .ForMember(d => d.Estado, o => o.MapFrom(s => (short?)(s.ESTADO ? 1 : 0)))
     .ForMember(d => d.Description, o => o.MapFrom(s => s.DESCRIPTION))
     .ForMember(d => d.Observacion, o => o.MapFrom(s => s.OBSERVACION))
     .ForMember(d => d.Key01, o => o.MapFrom(s => s.KEY01))
     .ForMember(d => d.Key02, o => o.MapFrom(s => s.KEY02))
     .ForMember(d => d.Key03, o => o.MapFrom(s => s.KEY03))
     .ForMember(d => d.Key04, o => o.MapFrom(s => s.KEY04))
     .ForMember(d => d.Key05, o => o.MapFrom(s => s.KEY05))
     .ForMember(d => d.Key06, o => o.MapFrom(s => s.KEY06))
     .ForMember(d => d.Value, o => o.MapFrom(s => s.VALUE))
     .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName));

            CreateMap<ConfigurationDto, ConfigurationE>()
                .ForMember(dest => dest.PK_CONFIGURATION, opt => opt.MapFrom(src => src.PkConfiguration))
                .ForMember(dest => dest.ESTADO, opt => opt.MapFrom(src => src.Estado.HasValue && src.Estado.Value == 1))
                .ForMember(dest => dest.DESCRIPTION, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.OBSERVACION, opt => opt.MapFrom(src => src.Observacion))
                .ForMember(dest => dest.KEY01, opt => opt.MapFrom(src => src.Key01))
                .ForMember(dest => dest.KEY02, opt => opt.MapFrom(src => src.Key02))
                .ForMember(dest => dest.KEY03, opt => opt.MapFrom(src => src.Key03))
                .ForMember(dest => dest.KEY04, opt => opt.MapFrom(src => src.Key04))
                .ForMember(dest => dest.KEY05, opt => opt.MapFrom(src => src.Key05))
                .ForMember(dest => dest.KEY06, opt => opt.MapFrom(src => src.Key06))
                .ForMember(dest => dest.VALUE, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.DisplayName));
        }
    }
}
