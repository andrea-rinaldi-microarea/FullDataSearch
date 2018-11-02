# FullDataSearch
## Create a ASP.NET Core service
In VS Code installs the ["C# for Visual Studio Code"](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) plugin.
Check you have installed the Entity Framework tools by testing the command `dotnet ef`.
We use the "Database First" approach.

To create an ASP.NET Core service which use Entity Framework for SQL Server:

### Create the project

`dotnet new webapi -o MyService`

open the folder with VS Code: `code MyService`.

CORS (Cross Origin Resource Sharing) must be enabled as we want to access this service from a separated Angular app. To enable it you must add a reference to the ASPNet Core CORS package:
```
dotnet add package Microsoft.AspNetCore.Cors --version 2.1.1
```
Then enable it in the service, change your `Startup.cs` in this way:
```csharp
public void ConfigureServices(IServiceCollection services)
{
...
    services.AddCors();
...
}
...
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
...
    app.UseCors( options => options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader() );
...
}
```
Please note that the only origin allowed is those the Angular app is supposed will run.

### Add Entity Framework support 
From VS Code open a terminal and add the Microsoft SQL Server database provider for Entity Framework Core to the project

`dotnet add package Microsoft.EntityFrameworkCore.SqlServer`

accept the restore command offered by VS Code.
Remove the useless reference to the Razor package in the .csproj
In Startup.cs comment out the `UseHttpsRedirection` in the `Configure` method
In "Debug | Open Configurations" set to `false` the `enabled` property of the `launchBrowser` group.

### Scaffold a DB Context
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

### Create a controller
In the `Controllers` folder add a file named `MyTableController.cs` with the following content:

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
```csharp
[HttpGet]
public ActionResult<List<MyTable>> GetAll()
{
    return _context.MyTable.ToList();
}
```

### Testing the result
Compile and run. Open a browser and navigate to `http://localhost:5000/api/mytable`.

You should get the list of data in your table.

## Create an Angular client
To create an Angular app which access the service, do as follow.
### Create the app
Scaffold a new Angular app and open it with VS Code:
```
ng new MyClient
code MyClient
```
Add Bootstrap support for better styiling the app. In a Terminal window give the following command:
```
npm install bootstrap
```
Change the `styles.css` file including the Bootstrap css:
```css
@import "~bootstrap/dist/css/bootstrap.css";
```
### Create a service to get the data
Scaffold a service which will require the data from the service:
```
ng generate service services/MyTable --no-spec
```
Add the Angular HTTP module in the `app.module.ts` file:
```typescript
import { HttpClientModule } from '@angular/common/http';
...
  imports: [
...
    HttpClientModule,
  ],
```
Change the content of `MyTable.service.ts` in this way:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyTableService {
  data: [];
  constructor(private http: HttpClient) { }

  public GetAllData() {
    this.http.get('http://localhost:5000/api/mytable').subscribe((data:any) => {
      this.data = data;
    },
    (error:any) => {
      console.log(error);
    });
  }
}
```
Add your service in those injectable by Angular, in the `app.module.ts` file set:
```
...
providers: [MyTableService],
...
```
### Create a view for the data
Scaffold a new component which will contain the data returned by the service:
```
ng generate component UI\MyTableList --no-spec
```
Replace all of the `app.component.html` code with the following:
```html
<div class="container">
  <app-my-table-list></app-my-table-list>
</div>

```
Prepare the component to visualize the data, replace `my-table-list.component.ts` content with:
```typescript
import { MyTableService } from './../../services/my-table.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-table-list',
  templateUrl: './my-table-list.component.html',
  styleUrls: ['./my-table-list.component.css']
})
export class MyTableListComponent {

  constructor(private myTableService: MyTableService) { }

  onShow() {
    this.myTableService.GetAllData();
  }
}
```
Set then the layout in `my-table-list.component.html` to something like this:
```html
<div class="row">
  <button class="btn btn-primary" (click)="OnShow()">Show Data</button>
</div>
<div class="row">
  <table class="table table-responsive">
    <tr>
      <th>column 1</th>
      <th>column 2</th>
    </tr>
    <tr *ngFor="let d of myTableService.data">
        <td>{{d.column1}}</td>
        <td>{{d.column2}}</td>
    </tr> 
  </table>
</div>
```
