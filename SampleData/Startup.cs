using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SampleData.Models;

namespace SampleData
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();            
            services.AddDbContext<Mago4Context>(
                opt => opt.UseSqlServer("Server=MARAUDER\\MARAUDER;Database=m4Test;User Id=sa;Password=Microarea.;")
                // opt => opt.UseSqlServer("Server=USR-RINALDIAND4;Database=Mago4Demo;User Id=sa;Password=Microarea.;")
            );
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors( options => options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader() );
            // app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
