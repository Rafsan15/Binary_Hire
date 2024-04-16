using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Diagnostics.Eventing.Reader;
using System.Xml.XPath;
using BH.CodeGen.Model;

namespace BH.CodeGen
{
	public class Converter
	{
        public static T GetLast<T>(ICollection collection)
        {
            return collection.Cast<T>().Last();
        }

        public static string DotNetTypeFromSqlDataType(string dataType)
        {


            switch (dataType.ToLower())
            {
                case "bigint":
                    return typeof(long).ToString();

                case "binary":
                case "image":
                case "timestamp":
                case "varbinary":
                case "varcharmax":
                case "nvharcharmax":
                    return typeof(byte[]).ToString();

                case "bit":
                    return typeof(bool).ToString();

                case "char":
                case "nchar":
                case "nvarchar":
                case "varchar":
                case "text":
                case "ntext":
                    return typeof(string).ToString();

                case "datetime":
                case "smalldatetime":
                case "date":
                case "time":
                case "datetime2":
                case "datetimeoffset":
                    return typeof(DateTime).ToString();

                case "decimal":
                case "money":
                case "numeric":
                case "smallmoney":
                    return typeof(decimal).ToString();

                case "float":
                    return typeof(double).ToString();

                case "int":
                    return typeof(int).ToString();

                case "real":
                    return typeof(float).ToString();

                case "uniqueidentifier":
                    return typeof(Guid).ToString();

                case "smallint":
                    return typeof(short).ToString();

                case "tinyint":
                    return typeof(byte).ToString();

                case "sql_variant":
                    return typeof(object).ToString();

                case "xml":
                    return typeof(System.Xml.XmlDocument).ToString();

                default:
                    return typeof(string).ToString();
            }
        }



        public static string DataTypeStringFromColumn(PropertyDefinition col)
        {
            switch (col.Type?.ToUpper())
            {
                case "STRING":
                    int length = Convert.ToInt16(col.Length);
                    if (length == -1)
                    {
                        return "NVARCHAR(MAX)";
                    }
                    else
                    {
                        return "NVARCHAR (" + length.ToString() + ")";
                    }
                    break;
                case "BOOL":
                    return "BIT";
                    break;
                default:
                    return col.Type?.ToUpper();

            }

        }

        public static string CamelCase(string wordCase)
        {
            return wordCase[0].ToString().ToLower()
                + wordCase.Substring(1, wordCase.Length - 1);

        }

        public static string EnumStringFromValue(object enumValue)
        {
            return Enum.GetName(enumValue.GetType(), enumValue);
        }

        //public static string GetSmoDataTypeString(Microsoft.SqlServer.Management.Smo.DataType dtype)
        //{
        //    return "DBType." + Enum.GetName(typeof(Microsoft.SqlServer.Management.Smo.SqlDataType), dtype.SqlDataType);
        //}

        public static DbType GetDbTypeFromSqlType(string sqType)
        {
            switch (sqType)
            {
                case "binary":
                    return DbType.Binary;
                case "bit":
                    return DbType.Boolean;
                case "bool":
                    return DbType.Boolean;
                case "char":
                    return DbType.AnsiStringFixedLength;
                case "date":
                    return DbType.Date;
                case "datetime":
                    return DbType.DateTime;
                case "datetime2":
                    return DbType.DateTime2;
                case "int":
                    return DbType.Int32;
                case "string":
                    return DbType.String;
                case "nchar":
                    return DbType.StringFixedLength;
                case "varchar":
                    return DbType.AnsiString;
                case "bigint":
                    return DbType.Int64;
                case "uniqueidentifier":
                    return DbType.Guid;
                case "decimal":
                    return DbType.Decimal;
                case "float":
                    return DbType.Double;
                case "nvarchar":
                    return DbType.String;
                default:
                    throw new InvalidOperationException();
            }
        }
    }
}

