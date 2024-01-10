using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
        .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.photos.FirstOrDefault(x => x.IsMain).Url))
        .ForMember(desk => desk.Age, opt => opt.MapFrom(src => src.DateofBirth.CalculateAge()));
        CreateMap<Photo, PhotoDto>();
    }
}
