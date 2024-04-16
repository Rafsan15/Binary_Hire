--region PROCEDURE [dbo].[SelectOrganization] @SqlWhereClause = '( Name like ''%Org1%'' )'
IF OBJECT_ID('[dbo].[SelectOrganization]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectOrganization] 
    END 
GO 
     
CREATE PROC [dbo].[SelectOrganization] 
( 
	@Page INT = 1,
	@PageSize INT = 10,
	@IsCountCalled BIT = 0,
	@SqlWhereClause NVARCHAR(500) = NULL
)
AS
BEGIN
	SET NOCOUNT ON
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @FirstRec INT, @LastRec INT
	SELECT @FirstRec = (@Page - 1) * @PageSize
	SELECT @LastRec = (@Page * @PageSize + 1)

	-- local parameters to overcome parameter sniffing issue
	DECLARE
		@LocalSearch NVARCHAR(500) = ISNULL(LTRIM(RTRIM(@SqlWhereClause)), ''),
		@sqlRestltQuery NVARCHAR(500) = '',
		@Query NVARCHAR(MAX) = '',
		@ParmDefinition NVARCHAR(MAX);

	IF @IsCountCalled = 1
	BEGIN
		SET @sqlRestltQuery = N' SELECT count(RowNum) AS RecordCount FROM TempResult  ';
	END
	ELSE
	BEGIN
		SET @sqlRestltQuery = N' SELECT top (@LastRec-1) [tr].[RowNum],tr.* FROM TempResult AS [tr] WHERE [RowNum] > @FirstRec AND [RowNum] < @LastRec ' ;
	END

	SET @Query = N'
				SELECT ROW_NUMBER() OVER(ORDER BY [Id]) as [RowNum], * FROM (
				SELECT * FROM [dbo].[Organization]';

	SET @ParmDefinition = '@FirstRec int, @LastRec int';

	SET @Query ='BEGIN WITH TempResult as('+ @Query + ')  AS list WHERE 1=1 '+ 
	CASE WHEN @LocalSearch <> '' THEN ' AND ' + @LocalSearch ELSE '' END +'  ) ' + @sqlRestltQuery +' END';

	--PRINT(@Query);

	EXEC sp_executesql @Query, @ParmDefinition, @FirstRec=@FirstRec, @LastRec= @LastRec;

	SET NOCOUNT OFF	END
GO
--endregion

