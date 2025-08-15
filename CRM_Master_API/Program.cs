
using CRM_Master_API.IServices;

using CRM_Master_API.Services;
using Microsoft.AspNetCore.Mvc;
using Repository.Core.IRepository;
using Repository.Core.Repository;


var builder = WebApplication.CreateBuilder(args);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS para React
const string ReactPolicy = "ReactPolicy";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(ReactPolicy, p =>
        p.WithOrigins("http://localhost:5173") // URL de tu frontend
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials() // si usas cookies/credenciales
    );
});
builder.Services.AddAutoMapper(typeof(Program));

// Controllers
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IConfigurationRepository, ConfigurationRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IConfigurationService, ConfigurationService>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseCors(ReactPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
