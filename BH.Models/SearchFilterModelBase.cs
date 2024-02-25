using System;
using Microsoft.VisualBasic;
using System.Text;

namespace BH.Models
{
	public class SearchFilterModelBase
	{
        public SearchModel? SearchModel { get; set; }
        public OrderByColumn? OrderByColumns { get; set; }

        public string GetSearchFilterClause()
        {
            var whereClause = new StringBuilder();
            if (SearchModel != null)
            {
                if (SearchModel.ValueSearch != null &&
                    SearchModel.ValueSearch.SearchColumnList != null &&
                    SearchModel.ValueSearch.SearchColumnList.Count > 0 &&
                    !string.IsNullOrWhiteSpace(SearchModel.ValueSearch.SearchValue))
                {
                    var searchValue = SearchModel.ValueSearch.SearchValue;
                    string[] columnArray = null;
                    if (!string.IsNullOrEmpty(SearchModel.ValueSearch.SearchValueType) &&
                        SearchModel.ValueSearch.SearchValueType.Equals(Constants.Constants.NUMBER_COLUMN_VALUE_TYPE, StringComparison.OrdinalIgnoreCase))
                    {
                        columnArray = SearchModel.ValueSearch.SearchColumnList.Select(searchColumn => $" {searchColumn} = {searchValue}").ToArray();
                    }
                    else
                    {
                        columnArray = SearchModel.ValueSearch.SearchColumnList.Select(searchColumn => $" {searchColumn} like '%{searchValue}%' ").ToArray();
                    }
                    whereClause.Append("(");
                    whereClause.Append(string.Join(" OR ", columnArray));
                    whereClause.Append(")");

                }

                if (SearchModel.ColumnFilter != null && SearchModel.ColumnFilter.Count > 0)
                {
                    if (whereClause.Length > 0)
                    {
                        whereClause.Append(" AND ");
                    }
                    
                    //for number type no need ''
                    
                    var columnArray = SearchModel.ColumnFilter
                        .Select(c => !string.IsNullOrEmpty(c.ColumnValueType) && c.ColumnValueType.Equals(Constants.Constants.NUMBER_COLUMN_VALUE_TYPE, StringComparison.OrdinalIgnoreCase) ?
                            getColumnValueString(c.ColumnName,c.ColumnValue, true) :
                            getColumnValueString(c.ColumnName,c.ColumnValue, false)).ToArray();
                    
                    // var columnArray = SearchModel.ColumnFilter
                    //     .Select(c => !string.IsNullOrEmpty(c.ColumnValueType) && c.ColumnValueType.Equals(Constants.Constants.NUMBER_COLUMN_VALUE_TYPE, StringComparison.OrdinalIgnoreCase) ?
                    //             $" {c.ColumnName} = {c.ColumnValue} " :
                    //             $" {c.ColumnName} = '{c.ColumnValue}' ").ToArray();

                    whereClause.Append("(");
                    whereClause.Append(string.Join(" AND ", columnArray));  
                    whereClause.Append(")");

                }

                if(OrderByColumns != null && OrderByColumns.ColumnName != null && OrderByColumns.ColumnName.Count > 0 )
                {
                    whereClause.Append(" ORDER BY ");
                    whereClause.Append(string.Join(",", OrderByColumns.ColumnName));
                    if (OrderByColumns.IsDescending)
                        whereClause.Append(" DESC");
                }
            }

            return whereClause.ToString();
        }

        private string getColumnValueString(string? argColumnName, List<string>? argColumnValue, bool isNumber)
        {
            if (argColumnValue == null || argColumnValue.Count == 0) 
            { 
                return " (1=1) ";
            }

            string result = " ( ";
            int c = 0;
            if (isNumber)
            {
                foreach (var v in argColumnValue)
                {
                    if (c != 0)
                    {
                        result += " OR ";
                    }

                    result += $" {argColumnName} = {v} ";
                    c++;
                }
            }
            else
            {
                foreach (var v in argColumnValue)
                {
                    if (c != 0)
                    {
                        result += " OR ";
                    }

                    result += $" {argColumnName} = '{v}' ";
                    c++;
                }
            }

            result += " ) ";
            return result;
        }
    }
}

