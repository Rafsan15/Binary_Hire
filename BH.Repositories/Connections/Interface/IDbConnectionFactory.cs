using System.Data;

namespace BH.Repositories.Connections.Interface
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateDbConnection(ConnectionName connectionName);
    }
}

