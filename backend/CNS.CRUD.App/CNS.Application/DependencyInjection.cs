using CNS.Application.Interfaces;
using CNS.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CNS.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration _configuration)
        {
            services.AddTransient<IEmployeeService, EmployeeService>();

            return services;
        }
    }
}
