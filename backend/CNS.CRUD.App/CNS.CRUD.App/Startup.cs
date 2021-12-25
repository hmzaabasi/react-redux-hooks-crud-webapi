using CNS.Application;
using CNS.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Linq;

namespace CNS.CRUD.App
{
    public class Startup
    {
        private const string SWAGGERVERSION = "v1";
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
            => _configuration = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPersistence(_configuration);
            services.AddApplication(_configuration);
            services.AddControllers();
            services.AddSwaggerGen(swagger => 
            {
                swagger.SwaggerDoc(SWAGGERVERSION, new OpenApiInfo { Title = "CNS Web API", Version = SWAGGERVERSION });
                swagger.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddCors(options => options.AddPolicy(
                MyAllowSpecificOrigins, 
                builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
            ));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            
            app.UseStaticFiles();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint($"/swagger/{SWAGGERVERSION}/swagger.json", "CNS Web API"));
            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
