using System;
using System.Collections.Generic;
using System.Data;
using Datos;
using EntityLayer;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Repository.Core.IRepository;

namespace Repository.Core.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connString;
        public UserRepository(IConfiguration configuration)
        {
            _connString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }
        #region SQL

        public List<UserE> GetList(UserE user)
        {
            try
            {
                using (var connection = new SqlConnection(_connString))
                {
                    string script = "dbo.PA_CON_MBR_TBL_USER";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", user.Opcion);
                        cmd.Parameters.AddWithValue("@P_ID", user.ID);
                        cmd.Parameters.AddWithValue("@P_User", user.User);
                        cmd.Parameters.AddWithValue("@P_Email", user.Email);
                        cmd.Parameters.AddWithValue("@P_Role", user.Id_Role);
                        cmd.Parameters.AddWithValue("@P_DocumentId", user.DocumentID);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<UserE> List = new List<UserE>();
                            while (reader.Read())
                            {
                                List.Add(new UserE()
                                {
                                    ID = Convert.ToInt32(reader["ID"].ToString()),
                                    User = reader["User"].ToString(),
                                    Password = UtilitarioE.DesencriptarString(reader["Password"].ToString()),
                                    Id_Role = Convert.ToInt32(reader["Id_Role"].ToString()),
                                    Description = reader["Descripcion"].ToString(),
                                    Status = UtilitySQL.ObtieneBool(reader, "Status"),
                                    Name = UtilitySQL.ObtieneString(reader, "Name"),
                                    Email = UtilitySQL.ObtieneString(reader, "Email"),
                                    PhoneNumber = UtilitySQL.ObtieneString(reader, "PhoneNumber"),
                                    DocumentID = UtilitySQL.ObtieneString(reader, "DocumentID"),
                                    ResetPassword = UtilitySQL.ObtieneBool(reader, "ResetPassword"),
                                    IdIdentificationType = Convert.ToInt32(reader["IdIdentificationType"].ToString()),
                                });
                            }
                            return List;
                        }
                    }
                }
            }
            catch
            {
                throw;
            }
        }

        public bool Maintenance(int P_OPCION, int P_ID, string P_USER, string P_PASSWORD, int P_ROLE)
        {
            try
            {
                using var connection = new SqlConnection(_connString);
                using var cmd = new SqlCommand("dbo.PA_MAN_MBR_TBL_user", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@P_OPCION", P_OPCION);
                cmd.Parameters.AddWithValue("@P_ID", P_ID);
                cmd.Parameters.AddWithValue("@P_User", P_USER);
                cmd.Parameters.AddWithValue("@P_Password", UtilitarioE.EncriptarString(P_PASSWORD));
                cmd.Parameters.AddWithValue("@P_ID_ROLE", P_ROLE);

                connection.Open();
                var affected = cmd.ExecuteNonQuery();
                return affected > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Maintenance(UserE user)
        {
            try
            {
                using var connection = new SqlConnection(_connString);
                using var cmd = new SqlCommand("dbo.PA_MAN_MBR_TBL_user", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@P_OPCION", user.Opcion);
                cmd.Parameters.AddWithValue("@P_ID", user.ID);
                cmd.Parameters.AddWithValue("@P_User", user.User);
                cmd.Parameters.AddWithValue("@P_Password", UtilitarioE.EncriptarString(user.Password));
                cmd.Parameters.AddWithValue("@P_ID_ROLE", user.Id_Role);
                cmd.Parameters.AddWithValue("@P_Status", user.Status);
                cmd.Parameters.AddWithValue("@P_Name", (object?)user.Name ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@P_Email", (object?)user.Email ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@P_PhoneNumber", (object?)user.PhoneNumber ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@P_DocumentID", (object?)user.DocumentID ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@P_ResetPassword", user.ResetPassword);
                cmd.Parameters.AddWithValue("@P_IdIdentificationType", user.IdIdentificationType);

                connection.Open();
                var affected = cmd.ExecuteNonQuery();
                return affected > 0;
            }
            catch
            {
                return false;
            }
        }

        #endregion
    }
}
