# FullDataSearch
There are 3 different applications:
* *FullDataSearch* the indexing service itself
* *SampleData* a service which can provide sample data to build the index upon
* *SampleClient* a client sample application which connect both to FullDataSearch and SampleData to build the index and test it

## Prerequisites
.NET Core 2.1 SDK (v2.1.403 minimum)

## Installation
Clone the repository, then
```
cd FullDataSearch
dotnet restore
cd ..\SampleData
dotnet restore
cd ..\SampleClient
npm i
```
## Use
Launch the SampleData server. Open a command prompt, move to the `SampleData` folder and run:
```
dotnet run
```
The SampleData server listen on port 5100.

Launch then the FullDataSearch server. Open another command prompt, move to the `FullDataSearch` folder and run:
```
dotnet run
```
The FullDataSearch server listen on port 5000 (the default for .NET Core).

Finally launch the client. Open a 3rd command prompt, move to the SampleClient folder and run:
```
ng serve
```
Open a browser and navigate to `http://localhost:4200`. The client sample interface should appear.
