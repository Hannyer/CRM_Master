# 1) Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# 2) Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos SOLO los .csproj necesarios para cachear el restore
COPY CRM_Master_API/CRM_Master_API.csproj CRM_Master_API/
COPY Repository.Core/Repository.Core.csproj Repository.Core/
COPY EntityLayer/EntityLayer.csproj EntityLayer/
# (NO copiar Service ni SLN_CRM_Master)

RUN dotnet restore CRM_Master_API/CRM_Master_API.csproj

# Ahora sí copiamos el resto del código
COPY . .

# Publicamos SOLO la API
WORKDIR /src/CRM_Master_API
RUN dotnet publish -c Release -o /app/publish

# 3) Imagen final
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet","CRM_Master_API.dll"]
