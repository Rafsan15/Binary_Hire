--region PROCEDURE [dbo].[SelectSchedule] @OrganizationId=1
IF OBJECT_ID('[dbo].[SelectSchedule]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectSchedule] 
    END 
GO 
     
CREATE PROC [dbo].[SelectSchedule] 
( 
	@Page INT = 1,
	@PageSize INT = 10,
	@OrganizationId INT,
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
				SELECT
					[SC].[Id],
					CONCAT([RS].[Name] , '' '' , [RS].Email) AS [Description],
					[SC].[JobPostId],
					[SC].[ResultId],
					[SC].[OrganizationId],
					[SC].[OnDate],
					[SC].[StartTime],
					[SC].[EndTime],
					[SC].[CreatedBy],
					[SC].[CreatedDate],
					[SC].[ModifiedBy],
					[SC].[ModifiedDate]
					FROM [dbo].[Schedule] AS [SC]
					LEFT JOIN [dbo].[Result] AS [RS] ON [RS].[Id] = [SC].[ResultId]
				';

	SET @ParmDefinition = '@FirstRec int, @LastRec int, @OrganizationId int';

	SET @Query ='BEGIN WITH TempResult as('+ @Query + ')  AS list WHERE 1=1' + CASE WHEN @LocalSearch <> '' THEN ' AND ' + @LocalSearch ELSE '' END  +'  ) ' + @sqlRestltQuery +' END';

	--PRINT(@Query);

	EXEC sp_executesql @Query, @ParmDefinition, @FirstRec=@FirstRec, @LastRec= @LastRec, @OrganizationId=@OrganizationId;

	SET NOCOUNT OFF	END
GO
--endregion

