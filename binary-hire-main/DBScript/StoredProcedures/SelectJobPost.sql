--region PROCEDURE [dbo].[SelectJobPost] @OrganizationId = 1
IF OBJECT_ID('[dbo].[SelectJobPost]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectJobPost] 
    END 
GO 
     
CREATE PROC [dbo].[SelectJobPost] 
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
				SELECT ROW_NUMBER() OVER(ORDER BY [Id] Desc) as [RowNum], * FROM (
				SELECT 
				JP.[Id],
				JP.[Title],
				JP.[Description],
				JP.[JobType],
				S_JobType.[DisplayText] AS [JobTypeName],
				JP.[MinExperience],
				JP.[MaxExperience],
				JP.[Location],
				JP.[Education],
				JP.[Skills],
				JP.[WorkPlace],
				S_WorkPlace.[DisplayText] AS [WorkPlaceName],
				JP.[IsFav],
				JP.[IsDeleted],
				JP.[Status],
				S_Status.[DisplayText] AS [StatusName],
				JP.[Note],
				JP.[OrganizationId],
				JP.[CreatedBy],
				JP.[CreatedDate],
				JP.[ModifiedBy],
				JP.[ModifiedDate] 
				FROM [dbo].[JobPost] AS JP
				LEFT JOIN [dbo].[Setting] AS S_JobType ON S_JobType.Id = JP.JobType
				LEFT JOIN [dbo].[Setting] AS S_WorkPlace ON S_WorkPlace.Id = JP.WorkPlace
				LEFT JOIN [dbo].[Setting] AS S_Status ON S_Status.Id = JP.Status
				WHERE JP.OrganizationId=@OrganizationId AND JP.IsDisabled=0';

	SET @ParmDefinition = '@FirstRec int, @LastRec int, @OrganizationId int';

	SET @Query ='BEGIN WITH TempResult as('+ @Query + ')  AS list WHERE 1=1' + CASE WHEN @LocalSearch <> '' THEN ' AND ' + @LocalSearch ELSE '' END  +'  ) ' + @sqlRestltQuery +' END';

	--PRINT(@Query);

	EXEC sp_executesql @Query, @ParmDefinition, @FirstRec=@FirstRec, @LastRec= @LastRec, @OrganizationId=@OrganizationId;

	SET NOCOUNT OFF	END
GO
--endregion

