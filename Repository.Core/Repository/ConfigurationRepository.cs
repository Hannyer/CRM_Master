using Datos;
using EntityLayer;
using Microsoft.Extensions.Configuration;
using Repository.Core.IRepository;
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Core.Repository
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        private readonly string _connString;

        public ConfigurationRepository(IConfiguration configuration)
        {
            _connString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }
        public List<ConfigurationE> GetList(ConfigurationE configurationE)
        {
            try
            {
                using (var connection = new SqlConnection(_connString))
                {
                    string script = "dbo.[PA_CON_TBL_MBR_CONFIGURACION]";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", configurationE.Opcion);
                        cmd.Parameters.AddWithValue("@P_KEY01", configurationE.KEY01);
                        cmd.Parameters.AddWithValue("@P_KEY02", configurationE.KEY02);
                        cmd.Parameters.AddWithValue("@P_KEY03", configurationE.KEY03);
                        cmd.Parameters.AddWithValue("@P_KEY04", configurationE.KEY04);
                        cmd.Parameters.AddWithValue("@P_KEY05", configurationE.KEY05);
                        cmd.Parameters.AddWithValue("@P_KEY06", configurationE.KEY06);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<ConfigurationE> List = new List<ConfigurationE>();
                            while (reader.Read())
                            {

                                List.Add(new ConfigurationE()
                                {
                                    PK_CONFIGURATION = UtilitySQL.ObtieneInt(reader, "PK_CONFIGURATION"),
                                DESCRIPTION = UtilitySQL.ObtieneString(reader, "DESCRIPTION"),
                                VALUE = UtilitySQL.ObtieneString(reader, "VALUE"),
                                KEY01 = UtilitySQL.ObtieneString(reader, "KEY01"),
                                KEY02 = UtilitySQL.ObtieneString(reader, "KEY02"),
                                KEY03 = UtilitySQL.ObtieneString(reader, "KEY03"),
                                KEY04 = UtilitySQL.ObtieneString(reader, "KEY04"),
                                KEY05 = UtilitySQL.ObtieneString(reader, "KEY05"),
                                KEY06 = UtilitySQL.ObtieneString(reader, "KEY06"),
                                DisplayName= UtilitySQL.ObtieneString(reader, "DISPLAYNAME"),
                                ESTADO=UtilitySQL.ObtieneBool(reader, "ESTADO")

                                });
                            }
                            return List;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Maintenance(ConfigurationE configurationE)
        {
            try
            {
                using (var connection = new SqlConnection(_connString))
                {
                    string script = "dbo.[PA_MAN_TBL_MBR_CONFIGURATION]";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", configurationE.Opcion);
                        cmd.Parameters.AddWithValue("@P_KEY03", configurationE.KEY03);
                        cmd.Parameters.AddWithValue("@P_KEY04", configurationE.KEY04);
                        cmd.Parameters.AddWithValue("@P_KEY05", configurationE.KEY05);
                        cmd.Parameters.AddWithValue("@P_KEY06", configurationE.KEY06);
                        cmd.Parameters.AddWithValue("@P_VALUE", configurationE.VALUE);
                    

                        int rowAffected= cmd.ExecuteNonQuery();

                        return rowAffected;
                    }
                }
            }
            catch (Exception ex)
            {
                throw  ex;
            }
        }
    }
}
