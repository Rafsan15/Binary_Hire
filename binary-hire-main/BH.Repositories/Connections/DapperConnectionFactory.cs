using System;
using BH.Repositories.Connections.Interface;
using System.Data;
using System.Data.SqlClient;

namespace BH.Repositories.Connections
{
    public class DapperConnectionFactory : IDbConnectionFactory
    {
        readonly IDictionary<ConnectionName, string> _connections;

        public DapperConnectionFactory(IDictionary<ConnectionName, string> connections)
        {
            _connections = connections;
        }
        public IDbConnection CreateDbConnection(ConnectionName connectionName)
        {
            if (_connections.TryGetValue(connectionName, out var connectionString))
                return new SqlConnection(connectionString);

            throw new ArgumentNullException(nameof(connectionString));
        }
    }
}

