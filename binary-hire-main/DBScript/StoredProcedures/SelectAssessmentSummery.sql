--region PROCEDURE [dbo].[SelectAssessmentSummery] @OrganizationId=1
IF OBJECT_ID('[dbo].[SelectAssessmentSummery]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectAssessmentSummery] 
    END 
GO 
     
CREATE PROC [dbo].[SelectAssessmentSummery] 
( 
	@Page INT = 1,
	@PageSize INT = 10,
	@JobId INT,
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
				SELECT ROW_NUMBER() OVER(ORDER BY [Id]) as [RowNum],
				* FROM (
				SELECT [RS].[Id],
				[RS].[Name],
				[RS].[Email],
				COUNT([ASC].[Id]) AS [QuestionAsked],
				CAST(SUM([ASC].Score) * 1.0 / NULLIF(COUNT([ASC].Score), 0) AS DECIMAL(18, 2)) AS [Score]
				FROM [dbo].[Assessment] AS [ASC]
				INNER JOIN [dbo].[Result] AS [RS] ON [RS].Id = [ASC].[ResultId]
				INNER JOIN [dbo].[Screening] AS [SC] ON [SC].Id = [RS].[ScreeningId]
				WHERE [SC].[JobPostId]=@JobId
				GROUP BY [RS].[Id],[RS].[Name], [RS].[Email]';

	SET @ParmDefinition = '@FirstRec int, @LastRec int, @JobId int';

	SET @Query ='BEGIN WITH TempResult as('+ @Query + ')  AS list WHERE 1=1' + CASE WHEN @LocalSearch <> '' THEN ' AND ' + @LocalSearch ELSE '' END  +'  ) ' + @sqlRestltQuery +' END';

	--PRINT(@Query);

	EXEC sp_executesql @Query, @ParmDefinition, @FirstRec=@FirstRec, @LastRec= @LastRec, @JobId=@JobId;

	SET NOCOUNT OFF	END
GO
--endregion

