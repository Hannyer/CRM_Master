﻿
using Datos;
using EntityLayer;
using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        public ReservationRepository() { }
        public List<ReservationE> GetList(ReservationE reservation)
        {
            try
            {
                using (var connection = new SqlConnection(Connection.GetConnectionString()))
                {
                    string script = "dbo.PA_CON_MBR_TBL_Reservation";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", reservation.Opcion);
                        cmd.Parameters.AddWithValue("@P_ID", reservation.Id);
                        cmd.Parameters.AddWithValue("@P_IDCARD_CLIENT", reservation.IdCard_Client);
                        cmd.Parameters.AddWithValue("@P_STATUS", reservation.Status);
                        cmd.Parameters.AddWithValue("@P_START_DATE", reservation.START_DATE);
                        cmd.Parameters.AddWithValue("@P_END_DATE", reservation.END_DATE);


                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<ReservationE> List = new List<ReservationE>();
                            while (reader.Read())
                            {
                                List.Add(new ReservationE()
                                {
                                    Id = Convert.ToInt32(reader["Id"].ToString()),
                                    Reservation_Description = reader["RESERVATION_DESCRIPTION"].ToString(),
                                    CheckIn = Convert.ToDateTime(reader["CheckIn"].ToString()),
                                    CheckOut = Convert.ToDateTime(reader["CheckOut"].ToString()),
                                    Status = reader["Status"].ToString(),
                                    Days = Convert.ToInt32(reader["Days"].ToString()),
                                    Price = UtilitySQL.ObtieneDecimal(reader, "PRICE"),
                                    SubtotalWithoutTax = UtilitySQL.ObtieneDouble(reader, "SubtotalWithoutTax"),
                                    TaxAmount = UtilitySQL.ObtieneDouble(reader, "TaxAmount"),
                                    TotalAmount = UtilitySQL.ObtieneDouble(reader, "TotalAmount"),
                                    ID_ROOM = UtilitySQL.ObtieneInt(reader, "ID_ROOM"),
                                    DESCRIPTION_HOTELROOM = UtilitySQL.ObtieneString(reader, "DESCRIPTION_HOTELROOM"),
                                    DESCRIPTION_HOTELROOM_NAME = UtilitySQL.ObtieneString(reader, "DESCRIPTION_HOTELROOM_NAME"),
                                    Deposit = UtilitySQL.ObtieneDecimal(reader, "Deposit"),
                                   Client_Mail=UtilitySQL.ObtieneString(reader, "Mail_Client"),
                                   Full_Name=UtilitySQL.ObtieneString(reader, "Full_Name"),
                                   IdCard_Client=UtilitySQL.ObtieneString(reader, "IdCard_Client"),
                                   create_by_external=UtilitySQL.ObtieneBool(reader, "create_by_external"),



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

        public int Maintenance(ReservationE reservation)
        {
            try
            {
                int NewIdGenerate = 0;
                using (var connection = new SqlConnection(Connection.GetConnectionString()))
                {
                    string script = "dbo.PA_MAN_MBR_TBL_Reservation";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", reservation.Opcion);
                        cmd.Parameters.AddWithValue("@P_ID", reservation.Id);
                        cmd.Parameters.AddWithValue("@P_IdCard_Client", reservation.IdCard_Client);
                        cmd.Parameters.AddWithValue("@P_Description", reservation.Reservation_Description);
                        cmd.Parameters.AddWithValue("@P_CheckIn", reservation.CheckIn);
                        cmd.Parameters.AddWithValue("@P_CheckOut", reservation.CheckOut);
                        cmd.Parameters.AddWithValue("@P_STATUS", reservation.Status == null ? 1:reservation.Status.Equals("Reservado")?1: Convert.ToInt32(reservation.Status));
                        cmd.Parameters.AddWithValue("@P_Days", reservation.Days);
                        cmd.Parameters.AddWithValue("@P_ID_Rate", reservation.ID_Rate);
                        cmd.Parameters.AddWithValue("@P_SubtotalWithoutTax", reservation.SubtotalWithoutTax);
                        cmd.Parameters.AddWithValue("@P_TaxAmount", reservation.TaxAmount);
                        cmd.Parameters.AddWithValue("@P_TotalAmount", reservation.TotalAmount);
                        cmd.Parameters.AddWithValue("@P_ID_ROOM", reservation.ID_ROOM);
                        cmd.Parameters.AddWithValue("@P_ID_USER", reservation.ID_USER);
                        cmd.Parameters.AddWithValue("@p_Deposit", reservation.Deposit);
                        cmd.Parameters.AddWithValue("@p_create_by_external", reservation.create_by_external);
                        cmd.Parameters.AddWithValue("@P_creation_date", reservation.creation_date);


                        using (SqlDataReader reader = cmd.ExecuteReader()) {

                            while (reader.Read())
                            {
                                NewIdGenerate = UtilitySQL.ObtieneInt(reader, "NewID");
                               
                            }
                            return NewIdGenerate;
                        }

                       
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
