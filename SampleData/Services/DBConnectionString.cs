using Microsoft.Extensions.Configuration;  
  
namespace SampleData.Services  
{  
    public class DBConnectionString
    {  
        public string connectionStr { get; set; }  
        public DBConnectionString()  
        {  
            connectionStr = "";  
        }  
        public string Get()  
        {  
            return connectionStr;  
        } 
        public void Set(string newConnectionString)
        {
            connectionStr = newConnectionString;
        }
        public bool IsValid()
        {
            return connectionStr.Length > 0;
        }
    }  
}  