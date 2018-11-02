# FullDataSearch
## Create a ASP.NET Core service
In VS Code installs the ["C# for Visual Studio Code"](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) plugin.
Check you have isntalled the Entity Framework tools by testing the command `dotnet ef`.
We use the "Database First" approach.

To create an ASP.NET Core service which use Entity Framework for SQL Server:

1. create the project

`dotnet new webapi -o MyService`

open the folder with VS Code: `code MyService`.

2. from VS Code open a terminal and add the Microsoft SQL Server database provider for Entity Framework Core to the project

`dotnet add package Microsoft.EntityFrameworkCore.SqlServer`

accept the restore command offered by VS Code.
Remove the useless reference to the Razor package in the .csproj
In Startup.cs comment out the `UseHttpsRedirection` in the `Configure` method
In "Debug | Open Configurations" set to `false` the `enabled` property of the `launchBrowser` group.

3. Scaffold a DB Context

From the terminal launch the following command

`dotnet ef dbcontext scaffold "Server=MyServer;Database=MyDB;User Id=MyUser;Password=MyPwd;" Microsoft.EntityFrameworkCore.SqlServer -o Models -t MyTable`

To use the context from the controllers, register the DB context in the Startup.cs. 

Copy the connecton string from MyDB.cs method `OnConfiguring` and insert the following lines:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    //-- add the following lines
    services.AddDbContext<MyDBContext>(opt => 
        opt.UseSqlServer("Server=MyServer;Database=MyDB;User Id=MyUser;Password=MyPwd;")
    );
    //
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
}
```

4. Create a controller

in the `Controllers` folder add a file named `MyTableController.cs` with the following content:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using SampleData.Models;

namespace SampleData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyTableController : ControllerBase
    {
        private readonly MyDBContext _context;

        public MyTableController(MyDBContext context)
        {
            _context = context;
        }
    }
}
```
add a get method to the controller whch returns all of your data
```
[HttpGet]
public ActionResult<List<MyTable>> GetAll()
{
    return _context.MyTable.ToList();
}
```

5. Testing the result

Compile and run. Open a browser and navigate to `http://localhost:5000/api/MyTable`.

You should get the list of data in your table.
