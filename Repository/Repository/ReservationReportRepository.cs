﻿using Datos;
using EntityLayer;
using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Repository.Repository
{
    public class ReservationReportRepository : IReservationReportRepository
    {
        public List<ReservationReportE> GetList(ReservationReportE reservationReportE)
        {
            try
            {
                using (var connection = new SqlConnection(Connection.GetConnectionString()))
                {
                    string script = "dbo.RE_CON_MBR_TBL_ReservationReport";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", reservationReportE.Opcion);
                        cmd.Parameters.AddWithValue("@P_CHECKIN", reservationReportE.checkIn);
                        cmd.Parameters.AddWithValue("@P_CHECKOUT", reservationReportE.checkOut);
                        cmd.Parameters.AddWithValue("@P_User", reservationReportE.UserId);
                        cmd.Parameters.AddWithValue("@P_Client", reservationReportE.Identification);
                        
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<ReservationReportE> List = new List<ReservationReportE>();
                            while (reader.Read())
                            {
                                List.Add(new ReservationReportE()
                                {
                                    Id = Convert.ToInt32(reader["Id"].ToString()),
                                    Identification = reader["Identification"].ToString(),
                                    Days = reader["Days"].ToString(),
                                    checkIn = Convert.ToDateTime(reader["checkIn"]),
                                    checkOut = Convert.ToDateTime(reader["checkOut"]),
                                    SubTotalWithOutTax = Math.Round(Convert.ToDouble((reader["SubtotalWithoutTax"])), 2),
                                    TaxAmount = Math.Round(Convert.ToDouble(reader["TaxAmount"]), 2),
                                    TotalAmount = Math.Round(Convert.ToDouble(reader["TotalAmount"]), 2),
                                    UserName =UtilitySQL.ObtieneString(reader, "GestorName"),
                                    UserEmail = UtilitySQL.ObtieneString(reader, "GestorEmail"),
                                    RoomDescription = reader["RoomDescription"].ToString(),
                                    RoomName = reader["RoomName"].ToString(),
                                    RoomCapacity = Convert.ToInt32(reader["RoomCapacity"]),
                                    ClientName = UtilitySQL.ObtieneString(reader, "GestorName")
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

        public List<TotalReportE> GetListTotalReport(TotalReportE totalReportE)
        {
            try
            {
                using (var connection = new SqlConnection(Connection.GetConnectionString()))
                {
                    string script = "dbo.RE_CON_MBR_TBL_TotalReport";
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(script, connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@P_OPCION", totalReportE.Opcion);
                        cmd.Parameters.AddWithValue("@P_CHECKIN", totalReportE.checkIn);
                        cmd.Parameters.AddWithValue("@P_CHECKOUT", totalReportE.checkOut);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            List<TotalReportE> List = new List<TotalReportE>();
                            while (reader.Read())
                            {
                                List.Add(new TotalReportE()
                                {
                                    Descripction = reader["Description"].ToString(),
                                    //ReservationType = reader["ReservationType"].ToString(),
                                    checkIn = "",
                                    checkOut = "",
                                    SubTotalWithOutTax = Math.Round(Convert.ToDouble((reader["SubTotalWithOutTax"])), 2),
                                    TaxAmount = Math.Round(Convert.ToDouble(reader["TaxAmount"]), 2),
                                    TotalAmount = Math.Round(Convert.ToDouble(reader["TotalAmount"]), 2)
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
      
    }
}
