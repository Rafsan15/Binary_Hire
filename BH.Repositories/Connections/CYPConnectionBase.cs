using System;
using BH.Repositories.Connections.Interface;
using System.Data;

namespace BH.Repositories.Connections
{
    public abstract class BHConnectionBase
    {
        public IDbConnection Connection { get; private set; }

        public BHConnectionBase(IDbConnectionFactory dbConnectionFactory)
        {
            Connection = dbConnectionFactory.CreateDbConnection(ConnectionName.BHDB);
        }
    }
}

