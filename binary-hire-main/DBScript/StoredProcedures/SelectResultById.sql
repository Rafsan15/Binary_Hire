--region PROCEDURE [dbo].[SelectResultById]
IF OBJECT_ID('[dbo].[SelectResultById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectResultById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectResultById] 
( 
	@Id INT
)
AS
	SELECT
	[R].[Id],
	[R].[ScreeningId],
	[R].[Name],
	[R].[Email],
	[R].[LocationPath],
	[R].[Score],
	[R].[OrganizationId],
	[S].[JobPostId]
	FROM [dbo].[Result] AS [R]
	LEFT JOIN [dbo].[Screening] AS [S] ON [S].Id = [R].ScreeningId
	WHERE [R].Id=@Id
GO
--endregion

